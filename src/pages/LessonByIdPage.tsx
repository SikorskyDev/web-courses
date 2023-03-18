import React from "react";
import { useGetCourseByIdQuery } from "../redux/courseListApi";
import { Link, useParams } from "react-router-dom";
import MyVideo from "../components/MyVideo/MyVideo";
import { ContainerCSS } from "../components/MyStyledComponents/ContainerCSS";
import styled from "styled-components";
import { Button } from "flowbite-react";
import { HiOutlineArrowLeft } from "react-icons/hi";

const LessonContainerCSS = styled.div`
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const TitleCSS = styled.div`
    align-self: center;
    font-size: 35px;
    font-weight: 700;
    text-align: center;
    @media (max-width: 617px) {
        font-size: 25px;
    }
    @media (max-width: 359px) {
        font-size: 20px;
    }
`;

const LessonByIdPage: React.FC = () => {
    //Витягую id із адресної строки
    const { lessonid, id } = useParams();

    //Роблю запит для отримання даних по id
    const { data, isError, isSuccess, isLoading } = useGetCourseByIdQuery(
        `${id}`
    );

    // Отримую урок по id
    let lessonById;
    if (isSuccess && data.lessons) {
        lessonById = data.lessons.find(
            (lessonObj) => lessonObj.id === lessonid
        );
    }

    //Отримую розмір екрану для передачі розмірів в пропси в реакт плеєра
    const [windowSize, setWindowSize] = React.useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    React.useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <ContainerCSS>
            <div>
                {isError && <h2>Error fetching data =(</h2>}
                {isLoading && <h2>Loading..</h2>}
                {isSuccess && (
                    <>
                        <div>
                            <Link to={`/${id}`}>
                                <Button outline={true}>
                                    <HiOutlineArrowLeft className="h-6 w-6" />
                                </Button>
                            </Link>
                        </div>
                        <LessonContainerCSS>
                            <TitleCSS>{lessonById?.title}</TitleCSS>
                            {lessonById?.link && (
                                <MyVideo
                                    url={lessonById.link}
                                    videoId={lessonById.id}
                                    width={
                                        windowSize?.width < 693
                                            ? windowSize.width - 20
                                            : ""
                                    }
                                    height={
                                        windowSize.width < 400
                                            ? 200
                                            : windowSize.width < 582
                                            ? 250
                                            : ""
                                    }
                                />
                            )}
                        </LessonContainerCSS>
                    </>
                )}
            </div>
        </ContainerCSS>
    );
};

export default LessonByIdPage;
