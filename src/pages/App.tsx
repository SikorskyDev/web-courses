import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import CoursesList from "../components/CoursesList/CoursesList";
import CourseByIdPage from "./CourseByIdPage";
import LessonByIdPage from "./LessonByIdPage";



const WrapperCSS = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    /* align-items: center; */
    padding: 10px 10px;
`;

function App() {

    return (
        <WrapperCSS>
            <Routes>
                <Route path="/" element={<CoursesList coursesPerPage={10} />} />
                <Route path="/:id" element={<CourseByIdPage />} />
                <Route path="/:id/:lessonid" element={<LessonByIdPage />} />
                <Route
                    path="*"
                    element={
                        <div style={{ textAlign: "center" }}>Not Found</div>
                    }
                />
            </Routes>
        </WrapperCSS>
    );
}

export default App;
