const Joi = require('joi');
const ExpressError = require('../utils/ExpressError');

module.exports.validateBlogCategories = function (req, res, next) {
    const categoriesSchema = Joi.object({
        category: Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required()
        }).required(),
    });

    const { error } = categoriesSchema.validate(req.body);

    if (error) {
        const message = error.details.map((el) => el.message).join(",");
        throw new ExpressError(message, 400);
    } else {
        next();
    }
};



module.exports.validateBlog = function (req, res, next) {
    const blogSchema = Joi.object({
        blog: Joi.object({
            title: Joi.string().required(),
            author: Joi.string().required(),
            blogCategory: Joi.string().required(),
            blogTags: Joi.string().required(),
            status: Joi.string().required()
        }),
    });

    const { error } = blogSchema.validate(req.body);

    if (error) {
        const message = error.details.map((el) => el.message).join(",");
        throw new ExpressError(message, 400);
    } else {
        next();
    }
};

module.exports.validateEvent = function (req, res, next) {
    const eventSchema = Joi.object({
        event: Joi.object({
            title: Joi.string().required(),
            venue: Joi.string().required(),
            host: Joi.string().required(),
            eventCategory: Joi.string().required(),
            eventTags: Joi.string().required(),
            eventDate: Joi.string().required()
        }).required(),
    });

    const { error } = eventSchema.validate(req.body);

    if (error) {
        const message = error.details.map((el) => el.message).join(",");
        throw new ExpressError(message, 400);
    } else {
        next();
    }
};

module.exports.validatePortfolio = function (req, res, next) {
    const portfolioSchema = Joi.object({
        portfolio: Joi.object({
            title: Joi.string().required(),
            client: Joi.string().required(),
            projectDate: Joi.string().required(),
            category: Joi.string().required(),
        }),
    });

    const { error } = portfolioSchema.validate(req.body);

    if (error) {
        const message = error.details.map((el) => el.message).join(",");
        throw new ExpressError(message, 400);
    } else {
        next();
    }
};

module.exports.validateBlogTags = function (req, res, next) {
    const blogTagsSchema = Joi.object({
        blogtag: Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
        }).required(),
    });

    const { error } = blogTagsSchema.validate(req.body);

    if (error) {
        const message = error.details.map((el) => el.message).join(",");
        throw new ExpressError(message, 400);
    } else {
        next();
    }
};


module.exports.validateTeams = function (req, res, next) {
    const teamsSchema = Joi.object({
        team: Joi.object({
            name: Joi.string().required(),
            role: Joi.string().required(),
        }).required(),
    });

    const { error } = teamsSchema.validate(req.body);

    if (error) {
        const message = error.details.map((el) => el.message).join(",");
        throw new ExpressError(message, 400);
    } else {
        next();
    }
};


module.exports.validateTestimonials = function (req, res, next) {
    const testimonialSchema = Joi.object({
        testimonial: Joi.object({
            role: Joi.string().required(),
            author: Joi.string().required(),
            body: Joi.string().required(),
        }).required(),
    });

    const { error } = testimonialSchema.validate(req.body);

    if (error) {
        const message = error.details.map((el) => el.message).join(",");
        throw new ExpressError(message, 400);
    } else {
        next();
    }
};


module.exports.validateEventCategories = function (req, res, next) {
    const eventCategoriesSchema = Joi.object({
        category: Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required()
        }).required(),
    });

    const { error } = eventCategoriesSchema.validate(req.body);

    if (error) {
        const message = error.details.map((el) => el.message).join(",");
        throw new ExpressError(message, 400);
    } else {
        next();
    }
};

module.exports.validateEventTags = function (req, res, next) {
    const eventTagsSchema = Joi.object({
        tag: Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
        }).required(),
    });

    const { error } = eventTagsSchema.validate(req.body);

    if (error) {
        const message = error.details.map((el) => el.message).join(",");
        throw new ExpressError(message, 400);
    } else {
        next();
    }
};

module.exports.validateVenue = function (req, res, next) {
    const venueSchema = Joi.object({
        venue: Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
        }).required(),
    });

    const { error } = venueSchema.validate(req.body);

    if (error) {
        const message = error.details.map((el) => el.message).join(",");
        throw new ExpressError(message, 400);
    } else {
        next();
    }
};

module.exports.validateHosts = function (req, res, next) {
    const hostSchema = Joi.object({
        host: Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
        }).required(),
    });

    const { error } = hostSchema.validate(req.body);

    if (error) {
        const message = error.details.map((el) => el.message).join(",");
        throw new ExpressError(message, 400);
    } else {
        next();
    }
};

module.exports.validatePortfolioCategories = function (req, res, next) {
    const portfolioCategoriesSchema = Joi.object({
        category: Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required()
        }).required(),
    });

    const { error } = portfolioCategoriesSchema.validate(req.body);

    if (error) {
        const message = error.details.map((el) => el.message).join(",");
        throw new ExpressError(message, 400);
    } else {
        next();
    }
};
