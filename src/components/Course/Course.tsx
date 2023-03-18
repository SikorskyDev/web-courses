import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AllCoursesType } from "../../types/apiTypes";
import ReactPlayer from "react-player";
import { Rating } from "flowbite-react";

const CourseCSS = styled(Link)`
    max-width: 312px;
    min-width: 240px;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12),
        0px 2px 4px rgba(0, 0, 0, 0.14);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease-in-out;
    justify-content: space-between;

    :hover {
        transform: scale(1.03);
        transition: all 0.3s ease-in-out;
    }
`;

const CourseAvatarCSS = styled.div<{ url: string }>`
    background-image: url(${(props) => props.url});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
    height: 150px;
`;

const CourseInfoCSS = styled.div`
    flex: 1 1 auto;
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: space-between;
`;

const CourseTitleCSS = styled.div`
    font-family: "Roboto Medium";
    font-weight: normal;
    font-style: normal;
    font-size: 20px;
    line-height: 30px;
    letter-spacing: 0.15px;
    color: rgba(0, 0, 0, 0.87);
`;

const CourseSpeciesCSS = styled.div`
    font-family: "Roboto Regular";
    font-weight: normal;
    font-style: normal;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.25px;
    color: rgba(0, 0, 0, 0.6);
`;

const CourseViseoCSS = styled.div``;

interface CoursePropsType {
    courseInfo: AllCoursesType;
}

const Course: React.FC<CoursePropsType> = ({ courseInfo }) => {
    //Відтворення відео по наведенню миші
    const [isHovering, setIsHovering] = useState(false);
    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    return (
        <CourseCSS
            to={`/${courseInfo.id}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <CourseAvatarCSS url={`${courseInfo.previewImageLink}/cover.webp`}>
                {/* <ImageByReact
                    src={`${courseInfo.previewImageLink}/cover.webp`}

                /> */}
            </CourseAvatarCSS>
            <CourseInfoCSS>
                <CourseTitleCSS>{courseInfo.title}</CourseTitleCSS>
                <CourseSpeciesCSS>Status: {courseInfo.status}</CourseSpeciesCSS>
                <CourseSpeciesCSS>
                    Number of lessons: {courseInfo.lessonsCount}
                </CourseSpeciesCSS>
                {courseInfo.meta.skills && (
                    <CourseSpeciesCSS>
                        <strong> What you get ?</strong>
                        <ul>
                            {courseInfo.meta.skills.map((skill, index) => {
                                return (
                                    <li key={courseInfo.id + index}>
                                        - {skill}
                                    </li>
                                );
                            })}
                        </ul>
                    </CourseSpeciesCSS>
                )}

                <CourseSpeciesCSS>
                    <Rating>
                        <Rating.Star />
                        <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                            Rating: {courseInfo.rating}
                        </p>
                    </Rating>{" "}
                </CourseSpeciesCSS>
                {courseInfo.meta.courseVideoPreview?.link && (
                    <CourseViseoCSS>
                        <ReactPlayer
                            // url={`http://localhost:5555/videos/${videoUrlProxi}`}
                            url={courseInfo.meta.courseVideoPreview.link}
                            playing={isHovering}
                            muted={true}
                            width="100%"
                            height="auto"
                        />
                    </CourseViseoCSS>
                )}
            </CourseInfoCSS>
        </CourseCSS>
    );
};

export default Course;
