import { useLocation , Route , Routes,Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ContentManager from './pages/ContentManager';
import SideBar from './components/Sidebar';
import History from './pages/History';
import Posts from './pages/subpages/Posts';
import Meeting from './pages/subpages/LiveChat';
import CommentTable from './pages/subpages/Comments';
import Jobs from './pages/subpages/Jobs';
import MediaLibrary from './pages/subpages/MediaLibrary';
import SEOManagement from './pages/subpages/SEOManagement';
import AddPost from './pages/subpages/AddPost';
import PageContentManager from './pages/PageContentManager';
import HomeSection from './pages/sections/Home.Section';
import AboutSection from './pages/sections/About.Section';
import ContactSection from './pages/sections/Contact.Section';
import QuoteSection from './pages/sections/Quote.Section';
import WorksSection from './pages/sections/Works.Section';
import FooterSection from './pages/sections/Footer.Section';
import Auth from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import AboutPartMain from './components/AboutPartMain';
import AboutPartSkills from './components/AboutPartSkills';
import AboutPartGoal from './components/AboutPartGoal';
import AboutPartWorksCount from './components/AboutPartWorksCount';
import AboutPartAditionalText from './components/AboutPartAditionalText';

function App() {
  const location = useLocation(); 
  const noSidebarPaths = ["/", "/content-manager", "/history"];
  const hideSideBar = !noSidebarPaths.includes(location.pathname);
  const protectedRoutes = [
    {path:"/" , element:<Dashboard/>},
    {path:"/content-manager" , element:<ContentManager/>},
    {path:"/section-manager" , element:<PageContentManager/>},
    {path:"/section-manager/home-section" , element:<HomeSection/>},
    {path:"/section-manager/about-section" , element:<AboutSection element={<AboutPartMain/>} enabled={"main"}/>},
    {path:"/section-manager/about-section/skills" , element:<AboutSection element={<AboutPartSkills/>} enabled={"skills"}/>},
    {path:"/section-manager/about-section/goals" , element:<AboutSection element={<AboutPartGoal/>} enabled={"goals"}/>},
    {path:"/section-manager/about-section/additional" , element:<AboutSection element={<AboutPartAditionalText/>} enabled={"additional"}/>},
    {path:"/section-manager/about-section/works" , element:<AboutSection element={<AboutPartWorksCount/>} enabled={"works"}/>},
    {path:"/section-manager/contact-section" , element:<ContactSection/>},
    {path:"/section-manager/quote-section" , element:<QuoteSection/>},
    {path:"/section-manager/works-section" , element:<WorksSection/>},
    {path:"/section-manager/footer-section" , element:<FooterSection/>},
    {path:"/content-manager/posts" , element:<Posts/>},
    {path:"/content-manager/SEO" , element:<SEOManagement/>},
    {path:"/content-manager/comments" , element:<CommentTable/>},
    {path:"/content-manager/media" , element:<MediaLibrary/>},
    {path:"/content-manager/posts/add-post" , element:<AddPost/>},
    /*<Route path="/history" element={<History/>} />*/
    /*<Route path="/content-manager/metting" element={<Meeting/>} />*/
    /*<Route path="/content-manager/jobs" element={<Jobs/>} />*/
  ];
  return (

      <div className='flex bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 w-full'>
        
        {!hideSideBar && (
          <div className='flex-3/12'>
          <SideBar/>
          </div>
        )}
          
        
        <div className={!hideSideBar ? 'flex-9/12' : 'flex-12/12'}>
          <Routes>        
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            {protectedRoutes.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={<ProtectedRoute>{element}</ProtectedRoute>}
              />
            ))}
           
          </Routes>
        </div>
        
      </div>

  )
}

export default App
