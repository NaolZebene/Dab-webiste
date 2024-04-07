const router = require('express').Router();
const { HomePage, AboutPage, ServicesPage, ContactUsPage, PortfolioPage, BloglistPage
    , oneBlogForm, onePortfolio, filterCategory, filterTags,
    EventlistPage, oneEventForm, filterEventCategory, filterEventTags } = require('../control/client')

router.get('/', HomePage);
router.get('/about', AboutPage);
router.get('/services', ServicesPage);
router.get('/contact', ContactUsPage);
router.get('/portfolio', PortfolioPage);
router.get('/blogs', BloglistPage);
router.get('/blogs/:id', oneBlogForm)
router.get('/portfolio/:id', onePortfolio);
router.get('/events', EventlistPage);
router.get('/event/:id', oneEventForm)
router.get('/eventtags/:slug', filterEventTags);
router.get('/eventcategory/:slug', filterEventCategory);

router.get('/category/:slug', filterCategory);
router.get('/tags/:slug', filterTags);

module.exports = router; 