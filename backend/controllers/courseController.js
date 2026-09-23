const Course = require("../models/courseModel");
const User = require("../models/userModel");

const validateCourse =
  require("../helpers/validateCourse");


// ========================================
// Get all courses
// ========================================

const getAllCourses = async (req, res) => {

  try {

    const courses =
      await Course.getAll();

    return res.status(200).json({

      message:
        "Courses retrieved successfully",

      courses,

    });

  } catch (error) {

    console.error(
      "Error getting courses:",
      error.message
    );

    return res.status(500).json({

      message:
        "Internal server error",

    });

  }

};


// ========================================
// Get one course
// ========================================

const getCourseById = async (req, res) => {

  try {

    const { id } =
      req.params;


    const course =
      await Course.getById(id);


    if (!course) {

      return res.status(404).json({

        message:
          "Course not found",

      });

    }


    return res.status(200).json({

      message:
        "Course retrieved successfully",

      course,

    });

  } catch (error) {

    console.error(
      "Error getting course:",
      error.message
    );

    return res.status(500).json({

      message:
        "Internal server error",

    });

  }

};


// ========================================
// Create course
// ========================================

const createCourse = async (req, res) => {

  try {

    // ------------------------------------
    // Server-side validation
    // ------------------------------------

    const validation =
      validateCourse(req.body);


    if (!validation.isValid) {

      return res.status(400).json({

        message:
          "Validation failed",

        errors:
          validation.errors,

      });

    }


    // ------------------------------------
    // Get validated data
    // ------------------------------------

    const {

      title,
      category,
      level,
      duration,
      price,
      image,
      description,

    } = validation.data;


    // ------------------------------------
    // Check duplicate course title
    // ------------------------------------

    const titleExists =
      await Course.existsByTitle(title);


    if (titleExists) {

      return res.status(400).json({

        message:
          "Validation failed",

        errors: {

          title:
            "Course title already exists",

        },

      });

    }


    // ------------------------------------
    // Create course
    // ------------------------------------

    const courseId =
      await Course.create({

        title,
        category,
        level,
        duration,
        price,
        image,
        description,

      });


    // ------------------------------------
    // Success response
    // ------------------------------------

    return res.status(201).json({

      message:
        "Course created successfully",

      courseId,

    });

  } catch (error) {

    console.error(
      "Error creating course:",
      error.message
    );


    return res.status(500).json({

      message:
        "Internal server error",

    });

  }

};


// ========================================
// Update course
// ========================================

const updateCourse = async (req, res) => {

  try {

    const { id } =
      req.params;


    // ------------------------------------
    // Server-side validation
    // ------------------------------------

    const validation =
      validateCourse(req.body);


    if (!validation.isValid) {

      return res.status(400).json({

        message:
          "Validation failed",

        errors:
          validation.errors,

      });

    }


    // ------------------------------------
    // Get validated data
    // ------------------------------------

    const {

      title,
      category,
      level,
      duration,
      price,
      image,
      description,

    } = validation.data;


    // ------------------------------------
    // Check whether course exists
    // ------------------------------------

    const existingCourse =
      await Course.getById(id);


    if (!existingCourse) {

      return res.status(404).json({

        message:
          "Course not found",

      });

    }


    // ------------------------------------
    // Check duplicate course title
    // Exclude current course ID
    // ------------------------------------

    const titleExists =
      await Course.existsByTitle(
        title,
        id
      );


    if (titleExists) {

      return res.status(400).json({

        message:
          "Validation failed",

        errors: {

          title:
            "Course title already exists",

        },

      });

    }


    // ------------------------------------
    // Update course
    // ------------------------------------

    await Course.update(

      id,

      {

        title,
        category,
        level,
        duration,
        price,
        image,
        description,

      }

    );


    // ------------------------------------
    // Get updated course
    // ------------------------------------

    const updatedCourse =
      await Course.getById(id);


    // ------------------------------------
    // Success response
    // ------------------------------------

    return res.status(200).json({

      message:
        "Course updated successfully",

      course:
        updatedCourse,

    });

  } catch (error) {

    console.error(
      "Error updating course:",
      error.message
    );


    return res.status(500).json({

      message:
        "Internal server error",

    });

  }

};


// ========================================
// Delete course
// ========================================

const deleteCourse = async (req, res) => {

  try {

    const { id } =
      req.params;


    // ------------------------------------
    // Check if course exists
    // ------------------------------------

    const existingCourse =
      await Course.getById(id);


    if (!existingCourse) {

      return res.status(404).json({

        message:
          "Course not found",

      });

    }


    // ------------------------------------
    // Delete course
    // ------------------------------------

    await Course.delete(id);


    return res.status(200).json({

      message:
        "Course deleted successfully",

    });

  } catch (error) {

    console.error(
      "Error deleting course:",
      error.message
    );


    return res.status(500).json({

      message:
        "Internal server error",

    });

  }

};


// ========================================
// Get statistics
// PUBLIC
// ========================================

const getStats = async (req, res) => {

  try {

    const courses =
      await Course.getAll();


    const studentCount =
      await User.countByRole("student");


    return res.status(200).json({

      message:
        "Statistics retrieved successfully",

      courseCount:
        courses.length,

      studentCount:
        studentCount,

    });

  } catch (error) {

    console.error(
      "Error getting statistics:",
      error.message
    );


    return res.status(500).json({

      message:
        "Internal server error",

    });

  }

};


// ========================================
// Export controllers
// ========================================

module.exports = {

  getAllCourses,

  getCourseById,

  createCourse,

  updateCourse,

  deleteCourse,

  getStats,

};