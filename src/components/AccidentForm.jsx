import { useState } from "react";

const AccidentForm = () => {
    const [responseData, setResponseDate] = useState([])
    // State to manage form data
    const [formData, setFormData] = useState({
        X: -8844610.72905766,
        Y: 5412413.88830144,
        INDEX_: 3387730,
        ACCNUM: 892658,
        TIME: 852,
        STREET1: "BLOOR ST W",
        STREET2: "DUNDAS ST W",
        OFFSET: "",
        ROAD_CLASS: "Major Arterial",
        DISTRICT: "Toronto and East York",
        WARDNUM: 4,
        LATITUDE: 43.656345,
        LONGITUDE: -79.45249,
        LOCCOORD: "Intersection",
        TRAFFCTL: "Traffic Signal",
        VISIBILITY: "Clear",
        LIGHT: "Daylight",
        RDSFCOND: "Dry",
        INVTYPE: "Driver",
        INVAGE: "unknown",
        INJURY: "None",
        VEHTYPE: "Automobile, Station Wagon",
        DRIVACT: "Turning Left",
        DRIVCOND: "Failed to Yield Right of Way",
        PEDESTRIAN: "Yes",
        CYCLIST: "No",
        AUTOMOBILE: "Yes",
        MOTORCYCLE: "No",
        TRUCK: "No",
        TRSN_CITY_VEH: "No",
        EMERG_VEH: "No",
        SPEEDING: "No",
        AG_DRIV: "Yes",
        REDLIGHT: "No",
        ALCOHOL: "No",
        DISABILITY: "No",
        HOOD_158: "High Park North",
        NEIGHBOURHOOD_158: "High Park North (88)",
        HOOD_140: "88",
        NEIGHBOURHOOD_140: "High Park North (88)",
        DIVISION: "D11",
    });

    // Function to handle form input changes
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send request to API with formData
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            setResponseDate([...responseData,data.prediction])
            window.scrollTo(0, 0);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex">
            <div className="bg-white p-8 rounded shadow-md max-w-xl w-full mr-4 ml-20">
                <h1 className="text-2xl font-bold mb-4 text-center">Accident Form</h1>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    {/* Mapping over keys of formData */}
                    {Object.keys(formData).map((key) => (
                        <div key={key}>
                            {/* Dropdown for Yes/No options */}
                            {formData[key] === 'Yes' || formData[key] === 'No' ? (
                                <div>
                                    <label htmlFor={key} className="block mb-1 capitalize">{key}:</label>
                                    <select
                                        id={key}
                                        name={key}
                                        value={formData[key]}
                                        onChange={handleInputChange}
                                        className="block w-full p-2 border border-gray-300 rounded"
                                    >
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            ) : (
                                // Text input for other fields
                                <div>
                                    <label htmlFor={key} className="block mb-1 capitalize">{key}:</label>
                                    <input
                                        type="text"
                                        id={key}
                                        name={key}
                                        value={formData[key]}
                                        onChange={handleInputChange}
                                        className="block w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                    {/* Submit button */}
                    <div className="col-span-2">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            {/* Display response data */}
            <div className="bg-white p-8 rounded shadow-md max-w-xl w-full ml-40">
                <h1 className="text-2xl font-bold mb-4 text-center">Response Data</h1>
                <pre className="p-4 border border-gray-300 rounded">
                    
                    { responseData.map((value, index) =>(
                        <div key={index}>
                            {value === 0 ? (<div>Prediction: No accident</div>): (<div>Prediction: Accident</div>)}
                        </div>
                    )) }
                </pre>
            </div>
        </div>
    );
    
};   

export default AccidentForm;
