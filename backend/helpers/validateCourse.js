function validateCourse(data) {

    const errors = {};

    // -----------------------------
    // Trim string values
    // -----------------------------

    const title =
        typeof data.title === "string"
            ? data.title.trim()
            : "";

    const category =
        typeof data.category === "string"
            ? data.category.trim()
            : "";

    const level =
        typeof data.level === "string"
            ? data.level.trim()
            : "";

    const duration =
        typeof data.duration === "string"
            ? data.duration.trim()
            : "";

    const image =
        typeof data.image === "string"
            ? data.image.trim()
            : "";

    const description =
        typeof data.description === "string"
            ? data.description.trim()
            : "";


    // -----------------------------
    // Validate Title
    // -----------------------------

    if (!title) {

        errors.title =
            "Title is required";

    } else if (title.length < 3) {

        errors.title =
            "Title must contain at least 3 characters";

    } else if (title.length > 100) {

        errors.title =
            "Title must not exceed 100 characters";
    }


    // -----------------------------
    // Validate Category
    // -----------------------------

    if (!category) {

        errors.category =
            "Category is required";

    } else if (category.length < 2) {

        errors.category =
            "Category must contain at least 2 characters";

    } else if (category.length > 50) {

        errors.category =
            "Category must not exceed 50 characters";
    }


    // -----------------------------
    // Validate Level
    // -----------------------------

    const allowedLevels = [
        "Beginner",
        "Intermediate",
        "Advanced"
    ];

    if (!allowedLevels.includes(level)) {

        errors.level =
            "Level must be Beginner, Intermediate, or Advanced";
    }


    // -----------------------------
    // Validate Duration
    // -----------------------------

    const durationPattern =
        /^[1-9]\d*\s+(Days|Weeks|Months)$/;

    if (!duration) {

        errors.duration =
            "Duration is required";

    } else if (!durationPattern.test(duration)) {

        errors.duration =
            "Duration must be a positive number followed by Days, Weeks, or Months";
    }


    // -----------------------------
    // Validate Price
    // -----------------------------

    const price =
        data.price !== undefined &&
        data.price !== null
            ? String(data.price).trim()
            : "";

    if (price === "") {

        errors.price =
            "Price is required";

    } else if (!/^-?\d+(\.\d{1,2})?$/.test(price)) {

        errors.price =
            "Price must be a valid number with no more than 2 decimal places";

    } else {

        const numericPrice =
            Number(price);

        if (numericPrice < 0) {

            errors.price =
                "Price cannot be negative";

        } else if (numericPrice > 1000000) {

            errors.price =
                "Price must not exceed 1,000,000";
        }
    }

    // -----------------------------
    // Validate Image
    // -----------------------------

    if (image) {

        if (image.length > 500) {

            errors.image =
                "Image URL must not exceed 500 characters";

        } else {

            try {

                const imageUrl =
                    new URL(image);

                if (
                    imageUrl.protocol !== "http:" &&
                    imageUrl.protocol !== "https:"
                ) {

                    errors.image =
                        "Image must be a valid HTTP or HTTPS URL";
                }

            } catch (error) {

                errors.image =
                    "Image must be a valid HTTP or HTTPS URL";
            }
        }
    }


    // -----------------------------
    // Validate Description
    // -----------------------------

    if (description.length > 1000) {

        errors.description =
            "Description must not exceed 1,000 characters";
    }


    // -----------------------------
    // Return validation result
    // -----------------------------

    return {
        isValid:
            Object.keys(errors).length === 0,

        errors,

        data: {
            title,
            category,
            level,
            duration,
            price,
            image,
            description
        }
    };
}


module.exports = validateCourse;