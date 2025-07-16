import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import moment from "jalali-moment";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

function QuoteSection() {
  // -------- 1️⃣ Stateها --------
  const [quotes, setQuotes] = useState([]);
  const [contentId, setContentId] = useState("");
  const [enAuthor, setEnAuthor] = useState("");
  const [faAuthor, setFaAuthor] = useState("");
  const [enContent, setEnContent] = useState("");
  const [faContent, setFaContent] = useState("");

  // -------- 2️⃣ واکشی داده‌ها (بدون پیغام toast) --------
  const fetchQuotes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/page-content/quote/all"
      );
      // پیام موفقیت حذف شد تا دیگر در بارگذاری اولیه پیغام ندهد

      const transformed = res.data.quotes.map((q) => ({
        id: q._id,
        authorEn: q.author.en,
        authorFa: q.author.fa,
        contentEn: q.content.en,
        contentFa: q.content.fa,
        createdAt: moment(q.createdAt)
          .locale("fa")
          .format("YYYY/MM/DD HH:mm"),
      }));
      setQuotes(transformed);
    } catch (err) {
      toast.error(err?.response?.data?.message?.en || "Error fetching quotes");
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  // -------- 3️⃣ تابع ویرایش (useCallback) --------
  const handleEdit = useCallback(
    (row) => {
      setContentId(row.id);
      setEnAuthor(row.authorEn);
      setFaAuthor(row.authorFa);
      setEnContent(row.contentEn);
      setFaContent(row.contentFa);
    },
    [] // ثابت است
  );

  // -------- 4️⃣ تابع حذف (useCallback) --------
  const deletData = useCallback(async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/page-content/quote/${id}`,
        {
          headers: {
            authorization: localStorage.getItem("Authorization"),
          },
        }
      );
      toast.success("Quote deleted successfully");
      fetchQuotes();
    } catch (error) {
      toast.error(
        error?.response?.data?.message?.fa || error.message || "Delete failed"
      );
    }
  }, []);

  const handleDelete = useCallback(
    (id) => {
      toast.custom((t) => (
        <div className="bg-white rounded shadow p-4 text-black w-60">
          <p className="mb-2">🗑️ Delete this quote?</p>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 text-sm border rounded cursor-pointer hover:bg-black/5 w-20"
            >
              cancel
            </button>
            <button
              type="button"
              onClick={async () => {
                toast.dismiss(t.id);
                await deletData(id);
              }}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded w-20 cursor-pointer hover:bg-red-700"
            >
              ok
            </button>
          </div>
        </div>
      ));
    },
    [deletData]
  );

  // -------- 5️⃣ تابع ریست فرم --------
  const handleReset = (e) => {
    e.preventDefault();
    setContentId("");
    setEnAuthor("");
    setFaAuthor("");
    setEnContent("");
    setFaContent("");
  };

  // -------- 6️⃣ تابع افزودن (POST) --------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/page-content/quote",
        {
          content: {
            en: enContent,
            fa: faContent,
          },
          author: {
            en: enAuthor,
            fa: faAuthor,
          },
        },
        {
          headers: {
            authorization: localStorage.getItem("Authorization"),
          },
        }
      );
      toast.success(res.data.message.en);
      fetchQuotes();
      handleReset(e);
    } catch (error) {
      toast.error(
        error?.response?.data?.message?.en || error.message || "Submit failed"
      );
    }
  };

  // -------- 7️⃣ تابع بروزرسانی (PUT) --------
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3000/api/page-content/quote/${contentId}`,
        {
          content: {
            en: enContent,
            fa: faContent,
          },
          author: {
            en: enAuthor,
            fa: faAuthor,
          },
        },
        {
          headers: {
            authorization: localStorage.getItem("Authorization"),
          },
        }
      );
      toast.success(res.data.message.en);
      fetchQuotes();
      handleReset(e);
    } catch (error) {
      toast.error(
        error?.response?.data?.message?.en || error.message || "Update failed"
      );
    }
  };

  // -------- 8️⃣ تعریف ستون‌ها با useMemo --------------------
  const columns = useMemo(
    () => [
      {
        header: "English Name",
        accessorKey: "authorEn",
        cell: (info) => <div>{info.getValue()}</div>,
      },
      {
        header: "Persian Name",
        accessorKey: "authorFa",
        cell: (info) => <div className="text-right rtl">{info.getValue()}</div>,
      },
      {
        header: "English Content",
        accessorKey: "contentEn",
        cell: (info) => <div>{info.getValue()}</div>,
      },
      {
        header: "Persian Content",
        accessorKey: "contentFa",
        cell: (info) => <div className="text-right rtl">{info.getValue()}</div>,
      },
      {
        header: "Created At",
        accessorKey: "createdAt",
        cell: (info) => <div>{info.getValue()}</div>,
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => handleEdit(row.original)}
              className="text-green-400 hover:text-green-600 p-2 cursor-pointer"
            >
              <FaEdit className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleDelete(row.original.id)}
              className="text-rose-500 hover:text-rose-800 p-2 cursor-pointer"
            >
              <MdDeleteForever className="w-5 h-5" />
            </button>
          </div>
        ),
      },
    ],
    [handleEdit, handleDelete]
  );

  // -------- 9️⃣ ساخت instance جدول با TanStack Table --------
  const table = useReactTable({
    data: quotes,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // -------- 🔟 رندر کامل کامپوننت --------
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster />
      <NavBar name="Quotes Manager" url="/section-manager" urlName="Back" />

      <div className="flex-1 w-full flex">
        {/* فرم اضافه‌کردن/ویرایش نقل‌قول */}
        <div className="flex min-w-52 w-1/4 border-r justify-center items-center text-amber-400 bg-black/20 border-amber-400">
          <form className="flex flex-col gap-4 p-4 border rounded">
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Author name :</label>
              <div className="flex items-center gap-3">
                <span className="w-5">En</span>
                <input
                  type="text"
                  className="px-4 accent-amber-400 py-1 rounded bg-gray-700"
                  value={enAuthor}
                  onChange={(e) => setEnAuthor(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5">Fa</span>
                <input
                  type="text"
                  className="px-4 accent-amber-400 py-1 rounded bg-gray-700"
                  value={faAuthor}
                  onChange={(e) => setFaAuthor(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold">Content :</label>
              <div className="flex items-start gap-3">
                <span className="w-5">En</span>
                <textarea
                  className="accent-amber-400 w-full bg-gray-700 px-2 py-1 rounded text-sm"
                  value={enContent}
                  onChange={(e) => setEnContent(e.target.value)}
                />
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5">Fa</span>
                <textarea
                  className="accent-amber-400 w-full bg-gray-700 px-2 py-1 rounded text-sm"
                  value={faContent}
                  onChange={(e) => setFaContent(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 w-fit ml-auto">
              <button
                type="button"
                className="w-24 bg-green-400 text-gray-800 rounded py-1 px-4 hover:bg-green-600 cursor-pointer"
                onClick={contentId ? handleUpdate : handleSubmit}
              >
                {contentId ? "Save" : "Add"}
              </button>
              <button
                type="button"
                className={`border border-rose-500 text-rose-500 rounded py-1 w-24 px-4 hover:bg-green-400/10 cursor-pointer ${
                  contentId || enAuthor || faAuthor || enContent || faContent
                    ? ""
                    : "hidden"
                }`}
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* جدول نقل‌قول‌ها */}
        <div className="flex-1 bg-black/10 overflow-y-auto text-white">
          <table className="w-full text-sm">
            <thead className="bg-black/55 text-white">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      className="p-2 border-b border-amber-400 text-amber-400"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-black/35 font-light text-amber-100 border-b border-amber-400"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-2 border-l border-amber-400/35">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default QuoteSection;
