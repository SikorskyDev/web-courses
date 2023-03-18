import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetCourseByIdQuery } from "../redux/courseListApi";
import MyVideo from "../components/MyVideo/MyVideo";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ContainerCSS } from "../components/MyStyledComponents/ContainerCSS";
import ImageByReact from "../components/ImageByReact/ImageByReact";
import { Badge, Button, Progress, Spinner } from "flowbite-react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import styled from "styled-components";
import MyDisabledLink from "../components/MyDisabledLink/MyDisabledLink";

const CourseContainerCSS = styled.div`
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;
const ImageCSS = styled.div``;

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

const SubTitleCSS = styled.div`
    align-self: center;
    font-size: 25px;
    font-weight: 50;
    @media (max-width: 617px) {
        font-size: 15px;
    }
`;

const VideoCSS = styled.div`
    width: 700px;
    align-self: center;
`;

const StartCSS = styled.div`
    font-size: 18px;
    text-decoration: underline;
`;

const LessonsContainerCSS = styled.div`
    display: flex;
    flex-direction: column;
`;
const LessonMainCSS = styled.div`
    font-size: 25px;
    align-self: center;
    margin-bottom: 20px;
`;

const LessonTitleCSS = styled.div`
    font-size: 20px;
    display: flex;
    align-items: center;
    gap: 5px;
`;
const LessonsCSS = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;
const LessonCSS = styled.li`
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: all 0.3s ease-in-out;
    :hover {
        transform: scale(1.01);
        transition: all 0.3s ease-in-out;
    }
`;
const LessonProgressCSS = styled.div``;

const CourseByIdPage: React.FC = () => {
    //Витягую id із адресної строки
    const { id } = useParams();


    const { watchedLessons } = useSelector(
        (state: RootState) => state.watchedLessonsSlice
    );
    
    //Роблю запит для отримання даних
    const { data, isSuccess, isError, isLoading } = useGetCourseByIdQuery(
        `${id}`
    );

    //Переформатовую дату в інший формат
    let formattedLaunchDate;
    if (data?.launchDate) {
        const launchDateStr: string = data.launchDate;
        const launchDate: Date = new Date(launchDateStr);
        formattedLaunchDate = `${launchDate
            .getDate()
            .toString()
            .padStart(2, "0")}.${(launchDate.getMonth() + 1)
            .toString()
            .padStart(2, "0")}.${launchDate.getFullYear()} ${launchDate
            .getHours()
            .toString()
            .padStart(2, "0")}:${launchDate
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;
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
                {isError && (
                    <h2>
                        Error fetching data=( <br />
                        try later
                    </h2>
                )}
                {isLoading && (
                    <div
                        className="text-center"
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                        }}
                    >
                        <Spinner aria-label="Center-aligned spinner example" />
                    </div>
                )}
                {isSuccess && (
                    <>
                        <div>
                            <Link to={"/"}>
                                <Button outline={true}>
                                    <HiOutlineArrowLeft className="h-6 w-6" />
                                </Button>
                            </Link>
                        </div>
                        <CourseContainerCSS>
                            <ImageCSS>
                                <ImageByReact
                                    src={data.previewImageLink + "/cover.webp"}
                                />
                            </ImageCSS>
                            <TitleCSS>{data.title}</TitleCSS>
                            <SubTitleCSS className="description">
                                {data.description}
                            </SubTitleCSS>
                            <VideoCSS>
                                {data.meta.courseVideoPreview && (
                                    <MyVideo
                                        url={data.meta.courseVideoPreview.link}
                                        autoPlay={true}
                                        volume={0.2}
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
                            </VideoCSS>
                            <StartCSS>
                                <strong>Start:</strong> {formattedLaunchDate}
                            </StartCSS>
                            <LessonsContainerCSS>
                                <LessonMainCSS>Lessons: </LessonMainCSS>
                                <LessonsCSS>
                                    {data.lessons.map((lesson) => {
                                        return (
                                            <MyDisabledLink
                                                to={`/${data.id}/${lesson.id}`}
                                                disabled={
                                                    lesson.status === "locked"
                                                }
                                                key={lesson.id}
                                            >
                                                <LessonCSS>
                                                    <LessonTitleCSS>
                                                        {lesson.order}.{" "}
                                                        {lesson.title}
                                                        {lesson.status ===
                                                        "locked" ? (
                                                            <Badge color="failure">
                                                                Locked
                                                            </Badge>
                                                        ) : (
                                                            <Badge color="success">
                                                                Unlocked
                                                            </Badge>
                                                        )}
                                                    </LessonTitleCSS>

                                                    {watchedLessons.some(
                                                        (progres) =>
                                                            progres.id ===
                                                            lesson.id
                                                    ) ? (
                                                        <LessonProgressCSS>
                                                            <Progress
                                                                progress={Math.round(
                                                                    Number(
                                                                        watchedLessons.find(
                                                                            (
                                                                                progres
                                                                            ) =>
                                                                                progres.id ===
                                                                                lesson.id
                                                                        )
                                                                            ?.progress
                                                                    ) * 100
                                                                )}
                                                                labelProgress={
                                                                    true
                                                                }
                                                                textLabel={
                                                                    "Watched"
                                                                }
                                                                size="lg"
                                                            />
                                                        </LessonProgressCSS>
                                                    ) : (
                                                        <LessonProgressCSS>
                                                            <Progress
                                                                progress={0.1}
                                                                labelProgress={
                                                                    false
                                                                }
                                                                size="lg"
                                                            />
                                                        </LessonProgressCSS>
                                                    )}
                                                </LessonCSS>
                                            </MyDisabledLink>
                                        );
                                    })}
                                </LessonsCSS>
                            </LessonsContainerCSS>
                        </CourseContainerCSS>
                    </>
                )}
            </div>
        </ContainerCSS>
    );
};

export default CourseByIdPage;
