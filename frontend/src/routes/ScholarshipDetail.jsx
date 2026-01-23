import React, { use, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '@/react-library/auth/context.jsx';
import { PrivateRoute } from '@/react-library/auth/RestrictedRoutes';
import { toast } from 'react-toastify';
import { TimeDate } from '@/react-library/miscel/TimeDate.jsx';
import { Loading } from '@/react-library/miscel/Loading.jsx';



export const ScholarshipDetail = () => {
    const { id } = useParams();
    const [scholarship, setScholarship] = useState(null);
    const { axiosInstance, user, loading } = useAuthContext();
    const [education, setEducation] = useState("");
    const [extras, setExtras] = useState("");
    const [message, setMessage] = useState("");
    const [reviews, setReviews] = useState(null);

    const fetchScholarshipDetails = async () => {
        let response = await axiosInstance.get(`/scholarship/fetch/${id}`);
        setScholarship(response.data.scholarship);
        console.log("Fetched scholarship details:", response.data);
    }

    const fetchReviews = async () => {
        try {
            let res = await axiosInstance.get(`/scholarship/reviews?scholarshipName=${scholarship.scholarshipName}`);
            setReviews(res.data.reviews);
            console.log("Fetched reviews:", res.data.reviews);
        } catch (err) {
            console.error("Error fetching reviews:", err);
        }
    };

    useEffect(() => {
        if (!scholarship) return;
        fetchReviews();

    }, [scholarship])


    useEffect(() => {
        if (!user) return;
        fetchScholarshipDetails();

    }, [user]);

    const Apply = async () => {

        if (!education || !extras || !message) {
            toast.error("Fill up all the fields");
            return;
        }

        let cost = parseInt(scholarship.applicationFees) + parseInt(scholarship.serviceCharge)
        let info = {
            scholarshipId: id,
            scholarshipName: scholarship.scholarshipName,
            cost,
            education, extras, message
        }

        console.log("Checkout info:", info);

        try {
            let response = await axiosInstance.post('/scholarship/apply', info);
            window.location.href = response.data.url;
        } catch (err) {
            console.error("Checkout error:", err);
        }
    }

    


    return (
        <PrivateRoute>
            { scholarship ?  <div className="mx-auto flex-grow w-full gap-4 flex flex-col lg:flex-row" >

                <div className="w-full lg:max-w-[32rem] lg:min-w-[32rem] self-start lg:sticky lg:top-10 px-2" >
                    <div className='h-72 lg:h-90 w-full rounded-lg bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${scholarship.image})` }} ></div>
                    <br/>
                    <div className='text-xl text-(--color4) font-bold' > {scholarship.universityName} <span  >({scholarship.worldRank})</span> </div>
                    <div> {scholarship.city} , {scholarship.country}</div>
                </div>

                <div className='px-2 flex-grow' >

                    <div className='text-xl text-(--color4) font-bold' >
                        {scholarship.scholarshipName}
                        <span className='text-(--color2) text-sm' > {scholarship.scholarshipCategory} </span>
                    </div>
                    <div className='font-bold' >{scholarship.degree} in {scholarship.subjectCategory}</div>

                    
                    <div className='text-(--color2)' > Deadline: <TimeDate date={scholarship?.deadline} /> </div>

                    <br />

                    <div className='text-xl text-(--color4) font-bold' > Expenses </div>
                    <div> Application Fees: {scholarship.applicationFees} USD </div>
                    <div> Service Charge: {scholarship.serviceCharge} USD </div>
                    <div> Tuition Fees: {scholarship.tuitionFees} USD </div>
                    <div> Net payable: {scholarship.applicationFees + scholarship.serviceCharge} USD </div>

                    <br />

                    {scholarship.description && <> <div className='font-bold text-xl' >Description</div>

                        <div> {scholarship.description}  </div> <br /> </>}


                    <div className='font-bold text-xl' ></div>

                    {/* <div>
                        {scholarship.postedBy} at {scholarship.postedAt}
                    </div> */}

                    <br />

                    {user?.role === 'student' && <>
                        <div className="text-xl text-[var(--color4)] font-bold"  >Apply Now</div>
                        <br />
                        <div className='font-bold' >Education</div>
                        <textarea
                            value={education} onChange={(e) => setEducation(e.target.value)}
                            placeholder='Write your educational qualifications'
                            className='resize-none block w-full max-w-[600px] p-2'
                            rows={5}
                            required
                        ></textarea>
                        <br />
                        <div className='font-bold' >Extra Curriculars</div>
                        <textarea
                            value={extras} onChange={(e) => setExtras(e.target.value)}
                            placeholder='Write your hobbies'
                            className='resize-none block w-full max-w-[600px] p-2'
                            rows={5}
                        ></textarea>

                        <br />
                        <div className='font-bold' >Message</div>
                        <textarea
                            value={message} onChange={(e) => setMessage(e.target.value)}
                            placeholder='Want to add any message?'
                            className='resize-none block w-full max-w-[600px] p-2'
                            rows={5}
                        ></textarea>

                        <br />
                        <button
                            onClick={Apply}
                            className='button-91' >Submit</button>

                    </>}

                    <br /><br /><br />

                    <div className='text-xl font-bold text-[var(--color4)]' >Top Reviews</div>

                    {reviews && reviews.map((review) => (
                        <div key={review._id} className='box-1212 p-4 mb-4 rounded-lg flex justify-between' >
                            <div>
                                <div className='mt-2 flex gap-2' > {[...Array(review.rating)].map(elem => <span key={elem} className='text-orange-500' >★</span>)} </div>
                                <div className='mt-2' > {review.comment} </div>
                                <div className='text-(--color2a)' > Reviewer: {review.reviewerName} </div>
                            </div>
                        </div>
                    ))}

                </div>


            </div>:
            <Loading /> }
        </PrivateRoute>
    );
};



// Scholarship Details Page
// Display comprehensive information about the selected scholarship, including University
// Image, Scholarship Name, University World Rank, Deadline, Location, Application Fees,
// Scholarship Description, and Stipend/Coverage details.
// Apply Button: A prominent "Apply for Scholarship" button.
// ● By clicking this redirects the user to the Payment/Checkout page.
// Reviews Section: Display all reviews associated with this scholarship/university. Show
// the reviewer's image, name, date, rating, and comment. This data comes from the
// Reviews Collection.
