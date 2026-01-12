import mongoose, {Types} from 'mongoose';


//   scholarshipCategory (Full fund/Partial/Self-fund), degree (Diploma/Bachelor/Masters), tuitionFees (optional), applicationFees, 
// serviceCharge, applicationDeadline, scholarshipPostDate, postedUserEmail.
const ScholarshipSchema = new mongoose.Schema({
    
    scholarshipName: {
        type: String,
        required: true,
    },
    universityName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    worldRank: {
        type: Number
    },
    scholarshipCategory: {
        type: String,
        required: true
    },
    subjectCategory: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    tuitionFees: {
        type: Number
    },
    applicationFees: {
        type: Number,
        required: true
    },
    serviceCharge: {
        type: Number,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    postedAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    postedBy: {
        type: String,
        required: true
    },
    description: {
        type: String,
        
    }


    
});

ScholarshipSchema.index({ scholarshipName: 1, universityName: 1  }, { unique: true });   

export const Scholarship = mongoose.model("Scholarship", ScholarshipSchema);

//Stores application data: scholarshipId, userId, userName, userEmail, universityName, scholarshipCategory, degree, applicationFees, serviceCharge, applicationStatus (default: pending), paymentStatus (unpaid/paid), applicationDate, feedback (added by moderator).

const ApplicationSchema= mongoose.Schema({

    scholarshipId: {
        type: Types.ObjectId,
        required: true
    },
    applicantId: {
        type: Types.ObjectId,
        required: true
    },
    applicantName: {
        type: String,
        required: true
    },
    applicantEmail: {
        type: String,
        required: true
    },
    education: {
        type: String,
    },
    extras: {
        type: String
    },
    message: {
        type: String
    },
    applicationStatus: {
        type: String,
        required: true,
        default: "pending"
    },
    paymentStatus: {
        type: String,
        required: true,
        default: "unpaid"
    },
    paymentAmount : {
        type: Number,
        required: true,
        default: 0
    },
    transId : {
        type: String
    },
    applicationDate: {
        type: Date
    },
    feedback: {
        type: String
    },
    moderatorId: {
        type: Types.ObjectId
    },
    moderatorName: {
        type: String
    }

})

export const Application = mongoose.model("Application", ApplicationSchema)

//Stores students review data: 

const ReviewSchema = mongoose.Schema({
    applicationId: {
        type: Types.ObjectId,
        required: true
    },
    scholarshipId: {
        type: Types.ObjectId,
        required: true
    },
    reviewerName: {
        type: String,
        required: true
    },
    reviewerEmail: {
        type: String,
        required: true
    },
    reviewerImage: {
        type: String,
    },
    rating: {
        type: Number
    }, 
    comment: {
        type: String
    }, 
    date: {
        type: Date
    }
})

export const Review = mongoose.model("Review", ReviewSchema)



// Data Design: You must have at least four collections: 
// 1. Users Collection:  
// ○ Stores user information, including name, email, photoURL, and their role 
// (e.g., "Student", "Moderator", "Admin"). 
// 2. Scholarships Collection:  
// ○ Stores scholarship data: scholarshipName, universityName, 
// universityImage, universityCountry, universityCity, 
// universityWorldRank, subjectCategory, scholarshipCategory (Full 
// fund/Partial/Self-fund), degree (Diploma/Bachelor/Masters), 
// tuitionFees (optional), applicationFees, serviceCharge, 
// applicationDeadline, scholarshipPostDate, postedUserEmail. 
// 3. Applications Collection:  
// ○ Stores application data: scholarshipId, userId, userName, userEmail, 
// universityName, scholarshipCategory, degree, applicationFees, 
// serviceCharge, applicationStatus (default: pending), paymentStatus 
// (unpaid/paid), applicationDate, feedback (added by moderator). 
// 4. Reviews Collection:  
// ○ Stores students review data: scholarshipId, universityName, 
// userName, userEmail, userImage, ratingPoint, reviewComment, 
// reviewDate. 