const Bootcamp = require('../models/Bootcamp');


// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  public
exports.getBootcamps = async (req, res, next) => {
  try{
    const bootcamps = await Bootcamp.find();
    res.status(200).json({
      success: true, 
      count: bootcamps.length,
      data: bootcamps
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: `Error: ${err.message}`
    })
  }
};

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  public
exports.getBootcamp = async (req, res, next) => {
  try{
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) { // El formato de ID está ok pero no se encontró el elemento
      return res.status(404).json({
        success: false,
        message: `Item not found`
      })
    }
    res.status(200).json({
      success: true, 
      data: bootcamp
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: `Error: ${err.message}`
    })
  }
};

// @desc    Create bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = async (req, res, next) => {
  try{
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true, 
      data: bootcamp
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: `Error: ${err.message}`
    })
  }
};

// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = async (req, res, next) => {
  try{
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new:true,
      runValidators: true
    });
    if (!bootcamp) { // El formato de ID está ok pero no se encontró el elemento
      return res.status(404).json({
        success: false,
        message: `Item not found`
      })
    }
    res.status(200).json({
      success: true, 
      data: bootcamp
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: `Error: ${err.message}`
    })
  }

};

// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = async (req, res, next) => {
  try{
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) { // El formato de ID está ok pero no se encontró el elemento
      return res.status(404).json({
        success: false,
        message: `Item not found`
      })
    }
    res.status(200).json({
      success: true, 
      data: {}
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: `Error: ${err.message}`
    })
  }
};