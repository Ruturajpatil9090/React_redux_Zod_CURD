import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from "react-redux";
import { createUser } from "../../features/userdetailSlice";
import { useNavigate } from 'react-router-dom';
import ActionButtonGroup from '../../Common/ActionButtons';
import NavigationButtons from "../../Common/NavigationButton";
import "../../App.css"

// Define your schema using Zod
const schema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    age: z.number().min(18).max(58),
    gender: z.enum(["Male", "Female"])
});

const CreateUser = () => {
    const [addOneButtonEnabled, setAddOneButtonEnabled] = useState(false);
    const [saveButtonEnabled, setSaveButtonEnabled] = useState(true);
    const [cancelButtonEnabled, setCancelButtonEnabled] = useState(true);
    const [editButtonEnabled, setEditButtonEnabled] = useState(false);
    const [deleteButtonEnabled, setDeleteButtonEnabled] = useState(false);
    const [backButtonEnabled, setBackButtonEnabled] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [highlightedButton, setHighlightedButton] = useState(null);
    const [cancelButtonClicked, setCancelButtonClicked] = useState(false);
    const [firstTenderData, setFirstTenderData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [lastTenderDetails, setLastTenderDetails] = useState([]);
    const [lastTenderData, setLastTenderData] = useState({});

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        dispatch(createUser(data));
        navigate("/");
    }

    const handleBack = () => {
        navigate("/");
    }

    //handle Add button Functionality
    const handleAddOne = async () => {
        // Disable the add button and enable other buttons
        setAddOneButtonEnabled(false);
        setSaveButtonEnabled(true);
        setCancelButtonEnabled(true);
        setEditButtonEnabled(false);
        setDeleteButtonEnabled(false);
        setIsEditMode(false);
        setIsEditing(true);

    };

    //handle Edit button Functionality
    const handleEdit = () => {
        setIsEditMode(true);
        setAddOneButtonEnabled(false);
        setSaveButtonEnabled(true);
        setCancelButtonEnabled(true);
        setEditButtonEnabled(false);
        setDeleteButtonEnabled(false);
        setBackButtonEnabled(true);
        setIsEditing(true);
    };

    //handle New record insert in datatbase and update the record Functionality
    const handleSaveOrUpdate = async () => {
        setIsEditing(true);

        setIsEditMode(false);
        setAddOneButtonEnabled(true);
        setEditButtonEnabled(true);
        setDeleteButtonEnabled(true);
        setBackButtonEnabled(true);
        setSaveButtonEnabled(false);
        setCancelButtonEnabled(false);
        setIsEditing(true);

    };

    //handle Delete the record from database functionality
    const handleDelete = async () => {

        setIsEditMode(false);
        setAddOneButtonEnabled(true);
        setEditButtonEnabled(true);
        setDeleteButtonEnabled(true);
        setBackButtonEnabled(true);
        setSaveButtonEnabled(false);
        setCancelButtonEnabled(false);
    };

    // handleCancel button cliked show the last record for edit functionality
    const handleCancel = async () => {
        setIsEditing(false);
        setIsEditMode(false);
        setAddOneButtonEnabled(true);
        setEditButtonEnabled(true);
        setDeleteButtonEnabled(true);
        setBackButtonEnabled(true);
        setSaveButtonEnabled(false);
        setCancelButtonEnabled(false);
        setCancelButtonClicked(true);
    };

    //Navigation Functionality to show first,previous,next and last record functionality
    const handleFirstButtonClick = async () => {

    };

    // Function to fetch the last record
    const handleLastButtonClick = async () => {

    };

    // Function to fetch the next record
    const handleNextButtonClick = async () => {

    };

    // Function to fetch the previous record
    const handlePreviousButtonClick = async () => {

    };

    return (
        <>

            <div className="container">
                <ActionButtonGroup
                    handleAddOne={handleAddOne}
                    addOneButtonEnabled={addOneButtonEnabled}
                    handleSaveOrUpdate={handleSaveOrUpdate}
                    saveButtonEnabled={saveButtonEnabled}
                    isEditMode={isEditMode}
                    handleEdit={handleEdit}
                    editButtonEnabled={editButtonEnabled}
                    handleDelete={handleDelete}
                    deleteButtonEnabled={deleteButtonEnabled}
                    handleCancel={handleCancel}
                    cancelButtonEnabled={cancelButtonEnabled}
                    handleBack={handleBack}
                    backButtonEnabled={backButtonEnabled}
                />
                <div>
                    {/* Navigation Buttons */}
                    <NavigationButtons
                        handleFirstButtonClick={handleFirstButtonClick}
                        handlePreviousButtonClick={handlePreviousButtonClick}
                        handleNextButtonClick={handleNextButtonClick}
                        handleLastButtonClick={handleLastButtonClick}
                        highlightedButton={highlightedButton}
                        isEditing={isEditing}

                    />

                </div>
            </div>

            <h2>User Creation</h2>

            <form className='form-container' onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" {...register("name")} className="form-control" />
                    {errors.name && <span>{errors.name.message}</span>}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" {...register("email")} className="form-control" />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>
                <div className="form-group">
                    <label>Age</label>
                    <input type="number" {...register("age", { valueAsNumber: true })} className="form-control" />
                    {errors.age && <span>{errors.age.message}</span>}
                </div>
                <div className="mb-3">
                    <input className="form-check-input" {...register("gender")} value='Male' type="radio" />
                    <label className="form-check-label">Male</label>
                </div>
                <div className="mb-3">
                    <input className="form-check-input" {...register("gender")} value='Female' type="radio" />
                    <label className="form-check-label">Female</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
}

export default CreateUser;
