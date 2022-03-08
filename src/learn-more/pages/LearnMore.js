import React from "react";
import FullWidthContainer from "../../homepage/components/FullWidthContainer";
// import { Tex, InlineTex } from "react-tex";

import "./LearnMore.css";

const LearnMore = () => {
    return (
        <div className="page-container">

            <FullWidthContainer
                backgroundColor="#EDF6FC"
                color="#061523"
                title="Why Matek?"
                width="75%"
                className="mb-0"
            >
                We have one goal for Matek; to make teaching highschool math easier. We know that each school is full of the most knowledgable teachers and we want to tap into that. It will start with a problem database, and from there we'll start conversations with teachers and ask what would make the day to day routine easier for them and also for their students. <br/> <br/> 
                As teachers sign up, the problem database will grow. We want to have hundres of problems for each content domain and every course. We'll start by focusing on Algebra 1, Algebra 2, and PreCalculus, and eventually move into Geometry and Calculus.

            </FullWidthContainer>
            {/* <FullWidthContainer
                backgroundColor="#EDF6FC"
                color="#061523"
                title="Why Matek?"
                width="75%"
                className="mb-0"
            >
                We have one goal for Matek; to make teaching highschool math easier. We know that each school is full of the most knowledgable teachers and we want to tap into that. It will start with a problem database, and from there we'll start conversations with teachers and ask what would make the day to day routine easier for them and also for their students. <br/> <br/> 
                As teachers sign up, the problem database will grow. We want to have hundres of problems for each content domain and every course. We'll start by focusing on Algebra 1, Algebra 2, and PreCalculus, and eventually move into Geometry and Calculus.

            </FullWidthContainer> */}
        </div>

        // <div className="learn-more__page page-container">
        //     <div className="page-container__body">
        //         <h2 className="body__header">Why Matek?</h2>
        //         <div className="body__content">
        //             <h3 className="content__subheader">Actually making the job easier.</h3>
        //             <p className="three-quarters">
        //                 We have one goal for Matek; to make teaching highschool math easier. We know that each school is full of the most knowledgable teachers and we want to tap into that. It will start with a problem database, and from there we'll start conversations with teachers and ask what would make the day to day routine easier for them and also for their students.
        //             </p>
        //             <p className="three-quarters">
        //                 As teachers sign up, the problem database will grow. We want to have hundres of problems for each content domain and every course. We'll start by focusing on Algebra 1, Algebra 2, and PreCalculus, and eventually move into Geometry and Calculus.
        //             </p>
        //         </div>
        //     </div>
        //     <div className="page-container__body">
        //         <h2 className="body__header">What is Katex?</h2>
        //         <div className="body__content">
        //             <h3 className="content__subheader">Actually making the job easier.</h3>
        //             <p className="three-quarters">
        //                 We have one goal for Matek; to make teaching highschool math easier. We know that each school is full of the most knowledgable teachers and we want to tap into that. It will start with a problem database, and from there we'll start conversations with teachers and ask what would make the day to day routine easier for them and also for their students.
        //             </p>
        //             <p className="three-quarters">
        //                 As teachers sign up, the problem database will grow. We want to have hundres of problems for each content domain and every course. We'll start by focusing on Algebra 1, Algebra 2, and PreCalculus, and eventually move into Geometry and Calculus.
        //             </p>
        //         </div>
        //     </div>
        // </div>
    );
};

export default LearnMore;
