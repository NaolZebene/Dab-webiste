const { knexInstance } = require('../db/knexInstance')
const wrapAsync = require('../utils/wrapAsync')


module.exports.HomePage = wrapAsync(async function (req, res) {
    const portfolioData = await knexInstance.from('portfolio');
    const teamsData = await knexInstance.from('teams');
    const blogData = await knexInstance.from('blogs');
    console.log(teamsData);
    res.render('client/Home', { portfolioData, teamsData, blogData });
})

module.exports.oneBlogForm = wrapAsync(async function (req, res) {
    const { id } = req.params;
    const name = "Blog"
    const oneBlogData = await knexInstance.from('blogs').where({
        blogId: id
    })
    const categoryData = await knexInstance.from('category');
    const blogData = await knexInstance.from('blogs')
    const tagData = await knexInstance.from('blogtags');
    res.render('client/blogDetail', { oneBlogData, categoryData, blogData, tagData })
})



module.exports.AboutPage = wrapAsync(async function (req, res) {
    const testimonialData = await knexInstance.from('testimonial');
    const teamsData = await knexInstance.from('teams');
    res.render("client/About", { testimonialData, teamsData })
})

module.exports.ServicesPage = function (req, res) {
    res.render("client/Services")
}

module.exports.ContactUsPage = function (req, res) {
    res.render("client/ContactUs")
}

module.exports.PortfolioPage = wrapAsync(async function (req, res) {
    const portfolioData = await knexInstance.from('portfolio');
    res.render('client/Portfolio', { portfolioData })
})

module.exports.onePortfolio = wrapAsync(async function (req, res) {
    const { id } = req.params;
    const onePortfolioData = await knexInstance.from('portfolio').where({
        portfolioId: id
    })
    res.render('client/onePortfolio', { onePortfolioData })
})

module.exports.BloglistPage = wrapAsync(async function (req, res) {
    const blogData = await knexInstance.from('blogs');
    const name = "Blogs"
    const categoryData = await knexInstance.from('category');
    const tagData = await knexInstance.from('blogtags');
    res.render('client/Bloglist', { blogData, categoryData, tagData, name })
})

module.exports.filterCategory = wrapAsync(async function (req, res) {
    const name = 'Blog'
    const categoryData = await knexInstance.from('category');
    const tagData = await knexInstance.from('blogtags');
    const { slug } = req.params;
    const blogData = await knexInstance.from('blogs').where({
        blogCategory: slug
    })
    res.render('client/Bloglist', { blogData, categoryData, tagData });

})

module.exports.filterTags = wrapAsync(async function (req, res) {
    const categoryData = await knexInstance.from('category');
    const tagData = await knexInstance.from('blogtags');
    const { slug } = req.params;
    const blogData = await knexInstance.from('blogs').where({
        blogTags: slug
    })
    res.render('client/Bloglist', { blogData, categoryData, tagData });
})

module.exports.EventlistPage = wrapAsync(async function (req, res) {
    const eventData = await knexInstance.from('events');
    const name = "Event"
    const categoryData = await knexInstance.from('eventCategory');
    const tagData = await knexInstance.from('eventTags');
    res.render('client/Eventlist', { eventData, categoryData, tagData, name })
})

module.exports.oneEventForm = wrapAsync(async function (req, res) {
    const { id } = req.params;
    const name = "Event"
    const oneEventData = await knexInstance.from('events').where({
        eventId: id
    })
    const categoryData = await knexInstance.from('eventCategory');
    const eventData = await knexInstance.from('events')
    const tagData = await knexInstance.from('eventTags');
    res.render('client/eventDetail', { oneEventData, categoryData, eventData, tagData, name })
})

module.exports.filterEventCategory = wrapAsync(async function (req, res) {
    const categoryData = await knexInstance.from('eventCategory');
    const tagData = await knexInstance.from('eventTags');
    const { slug } = req.params;
    const eventData = await knexInstance.from('events').where({
        eventCategory: slug
    })
    res.render('client/Eventlist', { eventData, categoryData, tagData });

})

module.exports.filterEventTags = wrapAsync(async function (req, res) {
    const categoryData = await knexInstance.from('eventCategory');
    const name = "Event"
    const tagData = await knexInstance.from('eventTags');
    const { slug } = req.params;
    const eventData = await knexInstance.from('events').where({
        eventTags: slug
    })
    res.render('client/Eventlist', { eventData, categoryData, tagData, name });
})