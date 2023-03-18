import React from "react";
import styled from "styled-components";
import { ContainerCSS } from "../MyStyledComponents/ContainerCSS";
import { useGetAllCoursesQuery } from "../../redux/courseListApi";
import Course from "../Course/Course";
import ImageByReact from "../ImageByReact/ImageByReact";
import mainImg from "../../assets/img/main.png";
import { Spinner } from "flowbite-react";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import {setCurrentPage} from '../../redux/paginationSlice';

const MainImageCSS = styled.div`
    max-width: 786px;
    margin: 50px 0;
`;

const CoursesListCSS = styled.div`
    margin-bottom: 50px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 24px;
    justify-items: center;

    @media (max-width: 1050px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 790px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 550px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

const PaginationWrapper = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    margin-bottom: 40px;
`;

const PageNumber = styled.li`
    margin: 0 8px;
    cursor: pointer;
`;

const PageButton = styled.button`
    background-color: #fff;
    color: grey;
    border: 1px solid grey;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-size: 16px;
    cursor: pointer;

    &:hover:not(:disabled) {
        background-color: grey;
        color: #fff;
    }

    &:disabled {
        cursor: default;
        opacity: 0.5;
    }
`;

interface CoursesListProps {
    coursesPerPage: number;
}

const CoursesList: React.FC<CoursesListProps> = ({ coursesPerPage }) => {
    const dispatch = useAppDispatch();

    //Зберігаємо сторінку в стейт
    const {currentPage} = useSelector((state: RootState) => state.paginationSlice);

    //Запит для отримання переліку курсів
    const { data, isSuccess, isLoading, isError } = useGetAllCoursesQuery();

    //Пагінація
    const startIndex = (currentPage - 1) * coursesPerPage;
    let endIndex;
    let currentCourses;
    let totalPages;

    if (isSuccess) {
        endIndex = Math.min(startIndex + coursesPerPage, data.courses.length);
        currentCourses = data.courses.slice(startIndex, endIndex);
        totalPages = Math.ceil(data.courses.length / coursesPerPage);
    }

    const handlePageChange = (pageNumber: number) => {
        dispatch(setCurrentPage(pageNumber));
    };

    return (
        <ContainerCSS>
            <MainImageCSS>
                <ImageByReact src={mainImg} />
            </MainImageCSS>
            <CoursesListCSS>
                {isError && (
                    <h2>
                        Error fetching data=( <br />
                        try later
                    </h2>
                )}
                {isLoading && (
                    <div className="text-center">
                        <Spinner aria-label="Center-aligned spinner example" />
                    </div>
                )}
                {currentCourses &&
                    currentCourses.map((courseObj) => {
                        return (
                            <Course key={courseObj.id} courseInfo={courseObj} />
                        );
                    })}
            </CoursesListCSS>
            <PaginationWrapper>
                {totalPages &&
                    Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (pageNumber) => (
                            <PageNumber
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                            >
                                <PageButton
                                    disabled={pageNumber === currentPage}
                                >
                                    {pageNumber}
                                </PageButton>
                            </PageNumber>
                        )
                    )}
            </PaginationWrapper>
        </ContainerCSS>
    );
};

export default CoursesList;
