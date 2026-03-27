import Review from "../Models/review.js";

/* Add Review */

export const addReview = async(req,res)=>{
  try{

    const newReview = new Review(req.body);

    await newReview.save();

    res.status(201).json({
      success:true,
      message:"Review submitted successfully"
    });

  }catch(error){

    res.status(500).json({
      message:"Error submitting review"
    });

  }
};


/* Get Reviews (Admin) */

export const getReviews = async(req,res)=>{

  try{

    const reviews = await Review.find().sort({createdAt:-1});

    res.json(reviews);

  }catch(error){

    res.status(500).json({
      message:"Error fetching reviews"
    });

  }

};


/* Delete Review */

export const deleteReview = async(req,res)=>{

  try{

    await Review.findByIdAndDelete(req.params.id);

    res.json({
      success:true,
      message:"Review deleted"
    });

  }catch(error){

    res.status(500).json({
      message:"Error deleting review"
    });

  }

};