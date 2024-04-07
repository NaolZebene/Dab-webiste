const router = require("express").Router();
const multer = require('multer');
const path = require('path')
const ExpressError = require('../utils/ExpressError')
const validation = require('../utils/joiValidation')
const { DashboardPage, AddEvents, AddBlogsForm,
    AllBlogs, AddBlog, addEvent, addCategory,
    addCategoryForm, addTag, addTagForm, allEvents,
    eventCategoriesForm, addEventCategories, eventTagForm,
    addEventTags, venueForm, addVenue, hostForm, addHost,
    portfolioForm, addPortfolio, ProjectDetails, allProjects,
    getOneProject, editoneProjectForm, editOneProject, deleteProject,
    editBlogForm, deleteBlog, editBlog, editblogCategoryForm,
    editBlogCategory, deleteBlogCategory, editBlogtagsForm, editTag,
    deleteBlogTag, editEventForm, editEvent, deleteEvent, editEventCategories,
    editEventCategoriesForm, deleteEventCategories,
    editEventTagsForm, editEventTags, deleteEventTag,
    editVenueForm, editVenue, deleteVenue,
    editHostForm, editHost, deleteHost, portfolioCategoryForm,
    addPortfolioCategory, editPortfolioCategoryForm, deletePortfolioCategory,
    editPortfolioCategory, addTestimonialsForm, allTestimonials, addTestimonials,
    editTestimonial, editTestimonialForm, deleteTestimonial, allTeams, addTeamsForm,
    addTeams, editTeamsForm, editTeams, deleteTeams } = require('../control/admin');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../images"))
    },
    filename: function (req, file, cb) {
        cb(null, Math.floor(Math.random() * 100).toString() + '-' + file.originalname);
    }
});
const Joi = require('joi')

const upload = multer({ storage: storage });

let thumbImageUpload = upload.single("thumbImage");

const { isLoggedIn } = require('../control/auth');

router.get('/dashboard', isLoggedIn, DashboardPage);
router.get('/addevent', isLoggedIn, AddEvents);
router.get('/addblogs', isLoggedIn, AddBlogsForm);
router.get('/allblogs', isLoggedIn, AllBlogs);
router.get('/addcategory', isLoggedIn, addCategoryForm);
router.get('/addblogtags', isLoggedIn, addTagForm);
router.get('/allevents', isLoggedIn, allEvents);
router.get('/addeventcategory', isLoggedIn, eventCategoriesForm)
router.get('/eventtag', isLoggedIn, eventTagForm);
router.get('/venue', isLoggedIn, venueForm);
router.get('/hosts', isLoggedIn, hostForm);
router.get('/addportfolio', isLoggedIn, portfolioForm);
router.get('/projectdetails', isLoggedIn, ProjectDetails);
router.get('/allprojects', isLoggedIn, allProjects)
router.get('/allprojects/:id', isLoggedIn, getOneProject);
router.get('/allprojects/:id/:projectId', isLoggedIn, editoneProjectForm)
router.get('/delete/:id', isLoggedIn, deleteProject);
router.get('/allblogs/delete/:blogId', isLoggedIn, deleteBlog);
router.get('/allblogs/:blogId', isLoggedIn, editBlogForm);
router.get('/editblogcategory/:id', isLoggedIn, editblogCategoryForm);
router.get('/deleteblogcategory/:id', isLoggedIn, deleteBlogCategory)
router.get('/editblogtags/:id', isLoggedIn, editBlogtagsForm);
router.get('/deleteblogtags/:id', isLoggedIn, deleteBlogTag);
router.get('/editeventform/:id', isLoggedIn, editEventForm);
router.get('/deleteevent/:id', isLoggedIn, deleteEvent)
router.get('/editeventcategoryform/:id', isLoggedIn, editEventCategoriesForm);
router.get('/deleteeventcategory/:id', isLoggedIn, deleteEventCategories);
router.get('/editeventtag/:id', isLoggedIn, editEventTagsForm);
router.get('/deleteeventtag/:id', isLoggedIn, deleteEventTag);
router.get('/editvenueform/:id', isLoggedIn, editVenueForm);
router.get('/deletevenue/:id', isLoggedIn, deleteVenue);
router.get('/edithostform/:id', isLoggedIn, editHostForm);
router.get('/deletehost/:id', isLoggedIn, deleteHost);
router.get('/allportfoliocategory', isLoggedIn, portfolioCategoryForm);
router.get('/editportfoliocategory/:id', isLoggedIn, editPortfolioCategoryForm);
router.get('/deleteportfoliocategory/:id', isLoggedIn, deletePortfolioCategory)
router.get('/addtestimonial', isLoggedIn, addTestimonialsForm)
router.get('/alltestimonials', isLoggedIn, allTestimonials)
router.get('/alltestimonials/:id', isLoggedIn, editTestimonialForm);
router.get('/alltestimonials/delete/:id', isLoggedIn, deleteTestimonial)
router.get('/allteams', isLoggedIn, allTeams);
router.get('/addteams', isLoggedIn, addTeamsForm)
router.get('/editteamsform/:id', isLoggedIn, editTeamsForm);
router.get('/deleteteam/:id', isLoggedIn, deleteTeams);

router.post('/addblogs', isLoggedIn, thumbImageUpload, AddBlog);
router.post('/addevent', isLoggedIn, thumbImageUpload, addEvent);
router.post('/addcategory', isLoggedIn, validation.validateBlogCategories, addCategory);
router.post('/addblogtags', isLoggedIn, validation.validateBlogTags, addTag);
router.post('/addeventcategory', isLoggedIn, addEventCategories);
router.post('/eventtag', isLoggedIn, validation.validateEventTags, addEventTags);
router.post('/venue', isLoggedIn, validation.validateVenue, addVenue);
router.post('/hosts', isLoggedIn, validation.validateHosts, addHost);
router.post('/addportfolio', isLoggedIn, validation.validatePortfolio, thumbImageUpload, addPortfolio);
router.post('/allprojects/:id', isLoggedIn, thumbImageUpload, validation.validatePortfolio, editOneProject)
router.post('/editblog/:blogId', isLoggedIn, thumbImageUpload, editBlog)
router.post('/editcategory/:id', isLoggedIn, validation.validateBlogCategories, editBlogCategory);
router.post('/editblogtag/:id', isLoggedIn, validation.validateBlogTags, editTag);
router.post('/editevent/:id', isLoggedIn, thumbImageUpload, editEvent);
router.post('/editeventcategory/:id', isLoggedIn, validation.validateEventCategories, editEventCategories);
router.post('/editeventtag/:id', isLoggedIn, validation.validateEventTags, editEventTags);
router.post('/editvenue/:id', isLoggedIn, validation.validateVenue, editVenue);
router.post('/edithost/:id', isLoggedIn, validation.validateHosts, editHost);
router.post('/addportfoliocategory', isLoggedIn, validation.validatePortfolioCategories, addPortfolioCategory);
router.post('/editportfoliocategory/:id', isLoggedIn, validation.validatePortfolioCategories, editPortfolioCategory);
router.post('/addtestimonial', isLoggedIn, validation.validateTestimonials, addTestimonials)
router.post('/edittestimonial/:id', isLoggedIn, validation.validateTestimonials, editTestimonial)
router.post('/addteams', isLoggedIn, thumbImageUpload, addTeams);
router.post('/editteam/:id', isLoggedIn, thumbImageUpload, editTeams)

module.exports = router;