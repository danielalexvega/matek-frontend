import { useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";

export const useProblem = () => {
    const [courses, setCourses] = useState([]);
    const [courseTitles, setCourseTitles] = useState([]);
    const [contentDomains, setContentDomains] = useState([]);
    const [filteredContentDomains, setFilteredContentDomains] = useState([]);
    const [domainTitles, setDomainTitles] = useState([]);
    const [subdomains, setSubdomains] = useState([]);
    const [filteredSubdomains, setFilteredSubdomains] = useState([]);
    const [subdomainTitles, setSubdomainTitles] = useState([]);

    const { sendRequest } = useHttpClient();

    const fetchCourses = async () => {
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL + "/courses/"
            );
            const courseList = responseData.courses.map((course) => {
                return { title: course.courseTitle, id: course.id };
            });

            const courseTitleList = courseList.map((course) => course.title);

            setCourses(courseList);
            setCourseTitles(courseTitleList);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchContentDomains = async () => {
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL + "/contentDomains/"
            );
            // Get Content Domain List
            const contentDomainList = responseData.contentDomains.map(
                (domain) => {
                    return {
                        title: domain.domainTitle,
                        id: domain.id,
                        course: domain.courses[0].value,
                        subdomains: domain.subdomains,
                    };
                }
            );

            // Create Domain Title List for Validation
            const domainTitleList = contentDomainList.map(
                (domain) => domain.title
            );
            // Get Subdomain List from Content Domain List
            const subDomainList = [];
            for (let i = 0; i < contentDomainList.length; i++) {
                if (contentDomainList[i].subdomains !== undefined) {
                    for (
                        let j = 0;
                        j < contentDomainList[i].subdomains.length;
                        j++
                    ) {
                        let tempSubDomain = {
                            course: contentDomainList[i].course,
                            contentDomain: contentDomainList[i].title,
                            title: contentDomainList[i].subdomains[j],
                            id: contentDomainList[i].id + j,
                        };
                        subDomainList.push(tempSubDomain);
                    }
                }
            }

            const subdomainTitleList = subDomainList.map(
                (subdomain) => subdomain.title
            );

            // List of all Content Domains
            setContentDomains(contentDomainList);
            setFilteredContentDomains(contentDomainList);
            setDomainTitles(domainTitleList);
            // List of all Content Domains and Subdomains
            setSubdomains(subDomainList);
            setFilteredSubdomains(subDomainList);
            setSubdomainTitles(subdomainTitleList);
        } catch (err) {
            console.log(err);
        }
    };

    const updateCourseDomains = (course) => {
        if (course === "") {
            setFilteredContentDomains(contentDomains);
            setFilteredSubdomains(subdomains);
        }
        // filter the content domains
        if (courseTitles.includes(course)) {
            let filteredDomainList = contentDomains.filter(
                (domain) => domain.course === course
            );
            setFilteredContentDomains(filteredDomainList);
            // filter the subdomains
            let filteredSubdomainList = subdomains.filter(
                (subdomain) => subdomain.course === course
            );
            setFilteredSubdomains(filteredSubdomainList);
        }
    };

    const updateCourseSubdomains = (domain) => {
        if (domain === "") {
            setFilteredSubdomains(subdomains);
        }

        if (domainTitles.includes(domain)) {
            let filteredSubDomainList = subdomains.filter(
                (subdomain) => subdomain.contentDomain === domain
            );
            setFilteredSubdomains(filteredSubDomainList);
        }
    };

    return [
        fetchCourses,
        fetchContentDomains,
        updateCourseDomains,
        updateCourseSubdomains,
        courses,
        courseTitles,
        contentDomains,
        filteredContentDomains,
        setFilteredContentDomains,
        domainTitles,
        subdomains,
        filteredSubdomains,
        setFilteredSubdomains,
        subdomainTitles,
    ];
};
