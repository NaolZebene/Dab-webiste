
const { knexInstance } = require('../db/knexInstance');
const wrapAsync = require('../utils/wrapAsync')

module.exports.DashboardPage = function (req, res) {
    res.render('admin/Dashboard')
}

module.exports.AddEvents = wrapAsync(async function (req, res) {
    const categoryData = await knexInstance.from('eventCategory');
    const tagData = await knexInstance.from('eventTags')
    res.render('admin/EventsForm', { categoryData, tagData })
})

module.exports.AddBlogsForm = wrapAsync(async function (req, res) {
    const categoryData = await knexInstance.from('category');
    const tagData = await knexInstance.from('blogtags')
    console.log(categoryData)
    res.render('admin/Addblog', { categoryData, tagData })
})

module.exports.AllBlogs = wrapAsync(async function (req, res) {
    const blogs = await knexInstance.from('blogs')
    res.render('admin/Allblogs', {
        blogs
    })
})

module.exports.addCategoryForm = wrapAsync(async function (req, res) {
    const allcategories = await knexInstance.from('category');
    res.render('admin/Addcategories', { allcategories })
}
)

module.exports.addTagForm = wrapAsync(async function (req, res) {
    const alltags = await knexInstance.from('blogtags')

    res.render('admin/Addtags', { alltags })
})
module.exports.allEvents = wrapAsync(async function (req, res) {
    const allevents = await knexInstance.from('events')
    res.render('admin/Allevents', { allevents });

})
module.exports.eventCategoriesForm = wrapAsync(async function (req, res) {
    const allcategories = await knexInstance.from('eventCategory');
    res.render('admin/EventCategories', { allcategories });
})

module.exports.eventTagForm = wrapAsync(async function (req, res) {
    const alltags = await knexInstance.from('eventTags')
    res.render('admin/Eventtags', { alltags })
})
module.exports.venueForm = wrapAsync(async function (req, res) {
    const allvenue = await knexInstance.from('venue');
    res.render('admin/Venue', { allvenue });
})
module.exports.hostForm = wrapAsync(async function (req, res) {
    const hosts = await knexInstance.from('host')
    res.render('admin/Host', { hosts });
})


module.exports.portfolioForm = wrapAsync(async function (req, res) {
    const categoryData = await knexInstance.from('portfolioCategory');
    res.render('admin/Addportfolio', { categoryData })
})
module.exports.ProjectDetails = wrapAsync(async function (req, res) {
    res.render('admin/Projectdetails')
})
module.exports.allProjects = wrapAsync(async function (req, res) {
    const projects = await knexInstance.from('portfolio')

    res.render('admin/Allprojects', { projects })
})

module.exports.editoneProjectForm = wrapAsync(async function (req, res) {
    const categoryData = await knexInstance.from('portfolioCategory');
    const { projectId } = req.params;
    const Oneproject = await knexInstance.from("portfolio").where({
        portfolioId: projectId
    })
    res.render('admin/Editportfolio', { Oneproject, categoryData })
})





module.exports.AddBlog = wrapAsync(async function (req, res) {
    const { title, blogTags, blogCategory, author, status } = req.body.blog
    const body = req.body.editor1;
    const today = new Date()
    const date = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate()


    const path = req.file.filename

    let data = {
        title,
        blogTags,
        blogCategory,
        author,
        status,
        body,
        dateTime: date,
        path
    }

    const insertedFile = await knexInstance.into("blogs").insert(data)
    req.flash('success', "Added A blog Successfully!!")
    res.redirect('/admin/addblogs');

})

module.exports.addEvent = wrapAsync(async function (req, res) {
    const { title, eventCategory, eventTags, host, venue, eventDate } = req.body.event;
    console.log(eventCategory);
    const path = req.file.filename;
    const eventBody = req.body.editor1
    let data = {
        title,
        eventCategory,
        eventTags,
        host,
        venue,
        eventDate,
        path,
        eventBody
    }

    await knexInstance.into("events").insert(data)

    req.flash('success', "Added an event successfully!!!");
    res.redirect('/admin/addevent')
}
)
module.exports.addCategory = wrapAsync(async function (req, res) {
    const { title, description } = req.body.category
    const data = {
        title,
        description
    }

    await knexInstance.into("category").insert(data)

    req.flash('success', 'Added a Category Successfully!!!');
    res.redirect('/admin/addcategory')
})

module.exports.addTag = wrapAsync(async function (req, res) {
    const { title, description } = req.body.blogtag;

    const data = { title, description }

    await knexInstance.into("blogtags").insert(data)

    req.flash('success', 'Added a blog tag successfully!!!');
    res.redirect('/admin/addblogtags')
})
module.exports.editBlogtagsForm = wrapAsync(async function (req, res) {
    const { id } = req.params
    const oneTag = await knexInstance.from('blogtags').where({ blogtagId: id })

    res.render('admin/EditblogTags', { oneTag });
})

module.exports.editTag = wrapAsync(async function (req, res) {
    const { title, description } = req.body.blogtag;
    const { id } = req.params;
    const data = { title, description }

    await knexInstance.from('blogtags').where({ blogtagId: id }).update(data);

    req.flash('success', 'Updated a Blog Tag Successfully');
    res.redirect('/admin/addblogtags');
})

module.exports.deleteBlogTag = wrapAsync(async function (req, res) {
    const { id } = req.params;

    await knexInstance.from('blogtags').where({ blogtagId: id }).first().delete();

    req.flash("success", "Deleted a Blog Tag Successfully");
    res.redirect("/admin/addblogtags")
})



module.exports.addEventCategories = wrapAsync(async function (req, res) {
    const { title, description } = req.body.category
    const data = {
        title,
        description
    }

    await knexInstance.into("eventCategory").insert(data)

    req.flash('success', 'Added an Event Category Successfully!!!');
    res.redirect('/admin/addeventcategory')
})

module.exports.editEventCategoriesForm = wrapAsync(async function (req, res) {
    const { id } = req.params;
    const oneEventCategory = await knexInstance.from('eventCategory').where({ categoryId: id })
    res.render('admin/Editeventcategories', { oneEventCategory });
})

module.exports.editEventCategories = wrapAsync(async function (req, res) {
    const { title, description } = req.body.category
    const { id } = req.params;
    const data = {
        title,
        description
    }

    await knexInstance.from('eventCategory').where({ categoryId: id }).update(data);

    req.flash('success', 'Updated Event Category Successfully');
    res.redirect('/admin/addeventcategory');
})


module.exports.deleteEventCategories = wrapAsync(async function (req, res) {
    const { id } = req.params;

    await knexInstance.from('eventCategory').where({ categoryId: id }).first().delete();

    req.flash('success', 'Deleted Event Category Successfully');
    res.redirect('/admin/addeventcategory');
}
)


module.exports.addEventTags = wrapAsync(async function (req, res) {
    const { title, description } = req.body.tag;
    const data = { title, description }

    await knexInstance.into("eventTags").insert(data)
    req.flash('success', 'Added an Event Tags Successfully!!!');
    res.redirect('/admin/eventtag')
}
)
module.exports.editEventTagsForm = wrapAsync(async function (req, res) {
    const categoryData = await knexInstance.from('eventCategory');
    const tagData = await knexInstance.from('eventTags')
    const { id } = req.params;
    const oneEventTag = await knexInstance.from('eventTags').where({ eventTagId: id })
    res.render('admin/Editeventtags', { oneEventTag, categoryData, tagData })
})

module.exports.editEventTags = wrapAsync(async function (req, res) {
    const { title, description } = req.body.tag;
    const data = { title, description }
    const { id } = req.params
    await knexInstance.from('eventTags').where({ eventTagId: id }).update(data);

    req.flash('success', 'Event Tags updated successfully');
    res.redirect('/admin/eventtag');
})

module.exports.deleteEventTag = wrapAsync(async function (req, res) {
    const { id } = req.params;
    await knexInstance.from('eventTags').where({ eventTagId: id }).first().delete();

    req.flash('success', 'Event Tags deleted successfully');
    res.redirect('/admin/eventtag')
})




module.exports.addVenue = wrapAsync(async function (req, res) {
    const { title, description } = req.body.venue;
    const data = { title, description }

    await knexInstance.into("venue").insert(data);

    req.flash('success', "Added a Venue Successfully!!!");
    res.redirect('/admin/venue')
})

module.exports.editVenueForm = wrapAsync(async function (req, res) {
    const { id } = req.params;

    const oneVenue = await knexInstance.from('venue').where({ venueId: id })

    res.render('admin/Editvenue', { oneVenue })
})

module.exports.editVenue = wrapAsync(async function (req, res) {
    const { title, description } = req.body.venue;
    const data = { title, description }
    const { id } = req.params
    await knexInstance.from('venue').where({ venueId: id }).update(data);

    req.flash('success', 'Updated venue successfully');
    res.redirect('/admin/venue');
})

module.exports.deleteVenue = wrapAsync(async function (req, res) {
    const { id } = req.params;

    await knexInstance.from('venue').where({ venueId: id }).first().delete();

    req.flash('success', 'Deleted venue successfully');
    res.redirect('/admin/venue');
})



module.exports.addHost = wrapAsync(async function (req, res) {
    const { title, description } = req.body.host;
    const data = { title, description };

    await knexInstance.into("host").insert(data);

    req.flash('success', "Added a Host Successfully!!!");
    res.redirect('/admin/hosts')
})

module.exports.editHostForm = wrapAsync(async function (req, res) {
    const { id } = req.params;
    const oneHost = await knexInstance.from('host').where({ hostId: id })
    res.render('admin/Edithost', { oneHost })
})

module.exports.editHost = wrapAsync(async function (req, res) {
    const { id } = req.params;
    const { title, description } = req.body.host;
    const data = { title, description };

    await knexInstance.from('host').where({ hostId: id }).update(data);

    req.flash('success', "Updated a Host Successfully!!!");
    res.redirect('/admin/hosts')

})

module.exports.deleteHost = wrapAsync(async function (req, res) {
    const { id } = req.params;
    await knexInstance.from('host').where({ hostId: id }).first().delete();

    req.flash('success', "Deleted a Host Successfully!!!");
    res.redirect('/admin/hosts')
})



module.exports.addPortfolio = wrapAsync(async function (req, res) {
    const { title, client, projectDate, category } = req.body.portfolio;
    const path = req.file.filename;
    const projectBody = req.body.editor1;

    let data = { title, client, projectDate, category, path, projectBody }

    await knexInstance.into("portfolio").insert(data);

    req.flash('success', "Added a Project Successfully");
    res.redirect('/admin/addportfolio');
})


module.exports.getOneProject = wrapAsync(async function (req, res) {
    const { id } = req.params;
    const project = await knexInstance.from("portfolio").where({
        portfolioId: id
    })
    res.render('admin/Projectdetails', { project })
})

module.exports.editOneProject = wrapAsync(async function (req, res) {
    const { id } = req.params;
    const { title, client, projectDate, category } = req.body.portfolio
    const projectBody = req.body.editor1
    const path = req.file.filename;
    const data = { title, client, projectDate, category, projectBody, path };

    console.log(data)
    await knexInstance.from('portfolio').where({
        portfolioId: id
    }).update(data)

    req.flash('success', "Updated Successfully");
    res.redirect('/admin/allprojects')
})

module.exports.deleteProject = wrapAsync(async function (req, res) {
    const { id } = req.params;
    await knexInstance.from("portfolio").where({
        portfolioId: id
    }).first().delete()

    req.flash("success", "Deleted Successfully");
    res.redirect('/admin/allprojects')
})

module.exports.editBlogForm = wrapAsync(async function (req, res) {
    const categoryData = await knexInstance.from('category');
    const tagData = await knexInstance.from('blogtags')
    const { blogId } = req.params;
    const Oneblog = await knexInstance.from("blogs").where({
        blogId: blogId
    })

    res.render('admin/Editblog', { Oneblog, categoryData, tagData })
})

module.exports.editBlog = wrapAsync(async function (req, res) {
    const { blogId } = req.params;
    const { title, author, blogCategory, blogTags, status } = req.body.blog;
    const body = req.body.editor1;
    const path = req.file.filename;

    const data = { title, author, blogCategory, blogTags, status, body, path };

    await knexInstance.from('blogs').where({
        blogId: blogId
    }).update(data);

    req.flash("success", "Updated a blog successfully");
    res.redirect('/admin/allblogs');
})

module.exports.deleteBlog = wrapAsync(async function (req, res) {
    const { blogId } = req.params;
    await knexInstance.from('blogs').where({ blogId: blogId }).first().delete();

    req.flash('success', "Deleted a blog successfully");
    res.redirect('/admin/allblogs');
})


module.exports.editblogCategoryForm = wrapAsync(async function (req, res) {
    const { id } = req.params;
    const oneCategory = await knexInstance.from('category').where({
        categoryId: id
    });

    res.render('admin/EditblogCategory', { oneCategory })

})

module.exports.editBlogCategory = wrapAsync(async function (req, res) {
    const { id } = req.params;

    const { title, description } = req.body.category;

    const data = { title, description };

    await knexInstance.from('category').where({
        categoryId: id
    }).update(data);

    req.flash('success', "Updated category successfully");
    res.redirect('/admin/addcategory')
})

module.exports.deleteBlogCategory = wrapAsync(async function (req, res) {
    const { id } = req.params;

    await knexInstance.from('category').where({ categoryId: id }).first().delete();
    req.flash('success', "Deleted a category successfully");
    res.redirect("/admin/addcategory");
}
)


module.exports.editEventForm = wrapAsync(async function (req, res) {
    const { id } = req.params;
    const categoryData = await knexInstance.from('eventCategory');
    const tagData = await knexInstance.from('eventTags')
    const oneEvent = await knexInstance.from('events').where({
        eventId: id
    });
    res.render('admin/Editevent', { oneEvent, categoryData, tagData })
})

module.exports.editEvent = wrapAsync(async function (req, res) {
    const { id } = req.params;
    const { title, eventCategory, eventTags, host, venue, eventDate } = req.body.event;
    console.log(eventCategory);
    const path = req.file.filename;
    const eventBody = req.body.editor1
    let data = {
        title,
        eventCategory,
        eventTags,
        host,
        venue,
        eventDate,
        path,
        eventBody
    }

    await knexInstance.from('events').where({ eventId: id }).update(data);

    req.flash("success", "Updated an Event Successfully");
    res.redirect('/admin/allevents');
})

module.exports.deleteEvent = wrapAsync(async function (req, res) {
    const { id } = req.params;
    await knexInstance.from('events').where({ eventId: id }).first().delete();

    req.flash('success', "Deleted an Event Successfully");
    res.redirect('/admin/allevents');
})

module.exports.portfolioCategoryForm = wrapAsync(async function (req, res) {
    const allcategories = await knexInstance.from('portfolioCategory');
    res.render('admin/Portfoliocategory', { allcategories })
}
)
module.exports.addPortfolioCategory = wrapAsync(async function (req, res) {
    const { title, description } = req.body.category
    const data = {
        title,
        description
    }

    await knexInstance.into("portfolioCategory").insert(data)

    req.flash('success', 'Added a Category Successfully!!!');
    res.redirect('/admin/allportfoliocategory')
})

module.exports.editPortfolioCategoryForm = wrapAsync(async function (req, res) {
    const { id } = req.params;
    const oneCategory = await knexInstance.from('portfolioCategory').where({
        categoryId: id
    });

    res.render('admin/Editportfoliocategory', { oneCategory })

})

module.exports.editPortfolioCategory = wrapAsync(async function (req, res) {
    const { id } = req.params;

    const { title, description } = req.body.category;

    const data = { title, description };

    await knexInstance.from('portfolioCategory').where({
        categoryId: id
    }).update(data);

    req.flash('success', "Updated category successfully");
    res.redirect('/admin/allportfoliocategory')
})

module.exports.deletePortfolioCategory = wrapAsync(async function (req, res) {
    const { id } = req.params;

    await knexInstance.from('portfolioCategory').where({ categoryId: id }).first().delete();
    req.flash('success', "Deleted a category successfully");
    res.redirect("/admin/allportfoliocategory");
})

module.exports.addTestimonialsForm = function (req, res) {
    res.render('admin/addTestimonials')
}

module.exports.addTestimonials = wrapAsync(async function (req, res) {
    const { author, role, body } = req.body.testimonial;
    const data = { author, role, body };

    await knexInstance.into("testimonial").insert(data)

    req.flash('success', "Added a Testimonial successfully");
    res.redirect("/admin/alltestimonials");
})

module.exports.allTestimonials = wrapAsync(async function (req, res) {
    const testimonials = await knexInstance.from('testimonial')
    res.render('admin/Alltestimonials', { testimonials })
}
)
module.exports.editTestimonialForm = wrapAsync(async function (req, res) {
    const { id } = req.params;
    const oneTestimonial = await knexInstance.from('testimonial').where({
        testimonialId: id
    });

    res.render('admin/Edittestimonial', { oneTestimonial })

})

module.exports.editTestimonial = wrapAsync(async function (req, res) {
    const { id } = req.params;

    const { author, role, body } = req.body.testimonial;
    const data = { author, role, body };

    await knexInstance.from('testimonial').where({
        testimonialId: id
    }).update(data);

    req.flash('success', "Updated Testimonial successfully");
    res.redirect('/admin/alltestimonials')
})

module.exports.deleteTestimonial = wrapAsync(async function (req, res) {
    const { id } = req.params;
    await knexInstance.from('testimonial').where({ testimonialId: id }).first().delete();
    req.flash('success', "Deleted a Testimonial successfully");
    res.redirect("/admin/alltestimonials");
})

module.exports.allTeams = wrapAsync(async function (req, res) {
    const allteams = await knexInstance.from('teams')
    res.render('admin/Teams', { allteams })
})

module.exports.addTeamsForm = function (req, res) {
    res.render('admin/Addteams')
}

module.exports.addTeams = wrapAsync(async function (req, res) {
    const { name, role } = req.body.team;
    const path = req.file.filename;

    const data = { name, role, path }

    await knexInstance.into("teams").insert(data)

    req.flash('success', "Added a Team successfully");
    res.redirect("/admin/allteams");
})

module.exports.editTeamsForm = wrapAsync(async function (req, res) {
    const { id } = req.params;
    const oneTeam = await knexInstance.from('teams').where({
        teamId: id
    });
    res.render('admin/Editteams', { oneTeam })
}
)
module.exports.editTeams = wrapAsync(async function (req, res) {
    const { name, role } = req.body.team;
    const path = req.file.filename;
    const { id } = req.params
    const data = { name, role, path }

    await knexInstance.from('teams').where({
        teamId: id
    }).update(data);

    req.flash('success', "Updated Team Member successfully");
    res.redirect('/admin/allteams')
})
module.exports.deleteTeams = wrapAsync(async function (req, res) {
    const { id } = req.params;
    await knexInstance.from('teams').where({ teamId: id }).first().delete();
    req.flash('success', "Deleted a Team Memeber successfully");
    res.redirect("/admin/allteams");
})