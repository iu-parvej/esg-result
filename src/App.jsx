import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

// Define image URLs for students
const studentImageMap = {
    "2031039": "https://i.ibb.co/ynYXPCfk/ASHIKA-RAHMAN-PANNA.png",
    "2031048": "https://i.ibb.co/qMmspmwd/AUTHORY-BISWAS-BIDDA.png",
    "2031013": "https://i.ibb.co/G4778Vwd/HOSSAIN-MOHAMMAD-SHIHAB.png",
    "2031043": "https://i.ibb.co/XrZqTvHq/JANNATUL-MAOUA-PROME.png",
    "2031032": "https://i.ibb.co/BVc0jwkq/JASMIN-AKTER-MUKTA.png",
    "2031001": "https://i.ibb.co/q3YsvKkb/KOBIR-HOSSAIN.png",
    "2031007": "https://i.ibb.co/rK3fVch5/M-D-BELAL-HOSSAIN-BADHON.png",
    "2031018": "https://i.ibb.co/wrCRDDL1/MD-EMRAN-HOSSAIN.png",
    "2031011": "https://i.ibb.co/4nYNfzPH/MD-HABIBUL-HASAN.png",
    "2031006": "https://i.ibb.co/TD8TC105/MD-MASHUK-E-RAHMAN.png",
    "2031017": "https://i.ibb.co/LDHT2Hvh/MD-NAFIU-UL-HAQUE.png",
    "2031004": "https://i.ibb.co/XfMNw1sq/MD-NAIMUL-ISLAM.png",
    "2031016": "https://i.ibb.co/hJCk50F5/MD-OMAYER-HAQUE-KHAN.jpg",
    "2031005": "https://i.ibb.co/svp64vNR/MD-PARVEJ-HOSSAIN.jpg",
    "2031009": "https://i.ibb.co/CKwVXN3x/MD-RASHIDUL-ISLAM.png",
    "2031021": "https://i.ibb.co/BV34DZ7z/MD-SHAHRIAR-HOSSAIN.png",
    "2031012": "https://i.ibb.co/60X8bXwX/MD-SHANZAD-ALI.png",
    "2031008": "https://i.ibb.co/LXpDkcJf/MD-TORIKUL-ISLAM-HIMEL.png",
    "2031003": "https://i.ibb.co/R4JGhKWS/MOHD-TAKIUDDIN.png",
    "2031023": "https://i.ibb.co/jvsKxC9F/MOST-MAHFUJA-ANAN.png",
    "2031034": "https://i.ibb.co/WbV5tsr/NAFi-JA-TASNIM-ANANNA.png",
    "2031041": "https://i.ibb.co/jkdbV5rQ/ORPA-AHMED.png",
    "2031045": "https://i.ibb.co/d0B8xCH4/RUKAIYA-HOSSAIN.png",
    "2031030": "https://i.ibb.co/j9p1pBGf/SHAFKAT-TASEEN-SADIYA.png",
    "2031019": "https://i.ibb.co/h3CLWnb/TUSHAR-BISWAS.png",
    "2031038": "https://i.ibb.co/PG9s9K3J/UMME-SAMIHA-ISLAM.png",
    "2031010": "https://i.ibb.co/ynZVb2q1/WASHIM-SHAHED-SOVON.png",
    "2031024": "https://i.ibb.co/mCNbhMpX/MST-AFROZA-KHATUN24.png", // Specific for 2031024
    "2031042": "https://i.postimg.cc/bNJkZxJB/KHADIJA-AKTER.png", // Unique image for Khadija Akter
};

const sharedImageUrl = "https://i.ibb.co/BVc0jwkq/JASMIN-AKTER-MUKTA.png"; // JASMIN AKTER MUKTA's image
const studentsUsingSharedImage = [
    "2031042", // KHADIJA AKTER
    "2031044", // MAHMUDA JANNAT OWYSHE
    "2031025", // MEFTAHUL JANNAT
    "2031036", // MST. AFROZA KHATUN (roll 2031036)
    "2031040", // MST. ANANNA-AFRIN
    "2031037", // MST. ANIKA TABASSUM
    "2031028", // MST. SULTANA PARVIN SHIFA
    "2031027" // SADIA ISLAM
];

// Updated student data based on user's corrections
const studentData = [
    {
        "name": "KOBIR HOSSAIN ",
        "roll": "2031001",
        "gpa_1_1": 3.54,
        "gpa_1_2": 3.421,
        "gpa_2_1": 3.517,
        "gpa_2_2": 3.517,
        "gpa_3_1": 3.705,
        "cgpa": 3.54
    },
    {
        "name": "MOHD. TAKIUDDIN ",
        "roll": "2031003",
        "gpa_1_1": 3.6,
        "gpa_1_2": 3.651,
        "gpa_2_1": 3.605,
        "gpa_2_2": 3.841,
        "gpa_3_1": 3.936,
        "cgpa": 3.73
    },
    {
        "name": "MD. NAIMUL ISLAM",
        "roll": "2031004",
        "gpa_1_1": 2.71,
        "gpa_1_2": 3.039,
        "gpa_2_1": 3.047,
        "gpa_2_2": 3.438,
        "gpa_3_1": 3.56,
        "cgpa": 3.16
    },
    {
        "name": "MD. PARVEJ HOSSAIN ",
        "roll": "2031005",
        "gpa_1_1": 3.74,
        "gpa_1_2": 3.612,
        "gpa_2_1": 3.75,
        "gpa_2_2": 3.886,
        "gpa_3_1": 3.936,
        "cgpa": 3.78
    },
    {
        "name": "MD. MASHUK E RAHMAN ",
        "roll": "2031006",
        "gpa_1_1": 3.16,
        "gpa_1_2": 3.224,
        "gpa_2_1": 2.791,
        "gpa_2_2": 3.472,
        "gpa_3_1": 3.566,
        "cgpa": 3.24
    },
    {
        "name": "M.D. BELAL HOSSAIN BADHON ",
        "roll": "2031007",
        "gpa_1_1": 2.82,
        "gpa_1_2": 3.059,
        "gpa_2_1": 2.895,
        "gpa_2_2": 3.233,
        "gpa_3_1": 3.391,
        "cgpa": 3.08
    },
    {
        "name": "MD. TORIKUL ISLAM HIMAL ",
        "roll": "2031008",
        "gpa_1_1": 3.03,
        "gpa_1_2": 3.513,
        "gpa_2_1": 3.413,
        "gpa_2_2": 3.614,
        "gpa_3_1": 3.7,
        "cgpa": 3.45
    },
    {
        "name": "MD. RASHIDUL ISLAM",
        "roll": "2031009",
        "gpa_1_1": 2.96,
        "gpa_1_2": 3.184,
        "gpa_2_1": 2.744,
        "gpa_2_2": 3.426,
        "gpa_3_1": 3.468,
        "cgpa": 3.16
    },
    {
        "name": "WASHIM SHAHED SOVON ",
        "roll": "2031010",
        "gpa_1_1": 3.21,
        "gpa_1_2": 3.487,
        "gpa_2_1": 3.43,
        "gpa_2_2": 3.784,
        "gpa_3_1": 3.974,
        "cgpa": 3.58
    },
    {
        "name": "MD. HABIBUL HASAN ",
        "roll": "2031011",
        "gpa_1_1": 3.34,
        "gpa_1_2": 3.382,
        "gpa_2_1": 3.157,
        "gpa_2_2": 3.301,
        "gpa_3_1": 3.44,
        "cgpa": 3.32
    },
    {
        "name": "MD. SHANZAD ALI ",
        "roll": "2031012",
        "gpa_1_1": 3.45,
        "gpa_1_2": 3.566,
        "gpa_2_1": 3.517,
        "gpa_2_2": 3.773,
        "gpa_3_1": 3.91,
        "cgpa": 3.64
    },
    {
        "name": "HOSSAIN MOHAMMAD SHIHAB SHARAR HIMEL ",
        "roll": "2031013",
        "gpa_1_1": 3.54,
        "gpa_1_2": 3.579,
        "gpa_2_1": 3.5,
        "gpa_2_2": 3.795,
        "gpa_3_1": 3.82,
        "cgpa": 3.65
    },
    {
        "name": "MD. OMAYER HAQUE KHAN ",
        "roll": "2031016",
        "gpa_1_1": 3.42,
        "gpa_1_2": 3.559,
        "gpa_2_1": 3.483,
        "gpa_2_2": 3.739,
        "gpa_3_1": 3.807,
        "cgpa": 3.6
    },
    {
        "name": "MD. NAFIU-UL-HAQUE",
        "roll": "2031017",
        "gpa_1_1": 3.32,
        "gpa_1_2": 3.289,
        "gpa_2_1": 3.355,
        "gpa_2_2": 3.733,
        "gpa_3_1": 3.64,
        "cgpa": 3.47
    },
    {
        "name": "MD. EMRAN HOSSAIN ",
        "roll": "2031018",
        "gpa_1_1": 2.85,
        "gpa_1_2": 3.283,
        "gpa_2_1": 3.116,
        "gpa_2_2": 3.653,
        "gpa_3_1": 3.45,
        "cgpa": 3.27
    },
    {
        "name": "TUSHAR BISWAS",
        "roll": "2031019",
        "gpa_1_1": 2.92,
        "gpa_1_2": 3.434,
        "gpa_2_1": 3.355,
        "gpa_2_2": 3.574,
        "gpa_3_1": 3.77,
        "cgpa": 3.41
    },
    {
        "name": "MD. SHAHRIAR HOSSAIN ",
        "roll": "2031021",
        "gpa_1_1": 3.34,
        "gpa_1_2": 3.368,
        "gpa_2_1": 3.11,
        "gpa_2_2": 3.466,
        "gpa_3_1": 3.57,
        "cgpa": 3.37
    },
    {
        "name": "MOST. MAHFUJA ANAN",
        "roll": "2031023",
        "gpa_1_1": 3.45,
        "gpa_1_2": 3.55,
        "gpa_2_1": 3.36,
        "gpa_2_2": 3.7,
        "gpa_3_1": 3.9,
        "cgpa": 3.59
    },
    {
        "name": "MOST. AFROZA KHATUN ",
        "roll": "2031024",
        "gpa_1_1": 3.52,
        "gpa_1_2": 3.737,
        "gpa_2_1": 3.587,
        "gpa_2_2": 3.716,
        "gpa_3_1": 3.92,
        "cgpa": 3.7
    },
    {
        "name": "MEFTAHUL JANNAT",
        "roll": "2031025",
        "gpa_1_1": 3.9,
        "gpa_1_2": 3.737,
        "gpa_2_1": 3.779,
        "gpa_2_2": 3.852,
        "gpa_3_1": 3.85,
        "cgpa": 3.82
    },
    {
        "name": "SADIA ISLAM",
        "roll": "2031027",
        "gpa_1_1": 3.44,
        "gpa_1_2": 3.382,
        "gpa_2_1": 3.448,
        "gpa_2_2": 3.682,
        "gpa_3_1": 3.82,
        "cgpa": 3.55
    },
    {
        "name": "MST. SULTANA PARVIN SHIFA ",
        "roll": "2031028",
        "gpa_1_1": 2.76,
        "gpa_1_2": 2.48,
        "gpa_2_1": 1.895,
        "gpa_2_2": 2.432,
        "gpa_3_1": 2.955,
        "cgpa": 2.5
    },
    {
        "name": "SHAFKAT TASEEN SADIYA ",
        "roll": "2031030",
        "gpa_1_1": 3.58,
        "gpa_1_2": 3.579,
        "gpa_2_1": 3.651,
        "gpa_2_2": 3.852,
        "gpa_3_1": 3.86,
        "cgpa": 3.7
    },
    {
        "name": "JASMIN AKTER MUKTA ",
        "roll": "2031032",
        "gpa_1_1": 3.22,
        "gpa_1_2": 3.553,
        "gpa_2_1": 3.203,
        "gpa_2_2": 3.67,
        "gpa_3_1": 3.735,
        "cgpa": 3.48
    },
    {
        "name": "NAFIJA TASNIM ANNANA ",
        "roll": "2031034",
        "gpa_1_1": 2.78,
        "gpa_1_2": 3.132,
        "gpa_2_1": 2.93,
        "gpa_2_2": 3.381,
        "gpa_3_1": 3.19,
        "cgpa": 3.08
    },
    {
        "name": "MST. AFROZA KHATUN ",
        "roll": "2031036",
        "gpa_1_1": 3.67,
        "gpa_1_2": 3.638,
        "gpa_2_1": 3.605,
        "gpa_2_2": 3.92,
        "gpa_3_1": 3.85,
        "cgpa": 3.74
    },
    {
        "name": "MST. ANIKA TABASSUM ",
        "roll": "2031037",
        "gpa_1_1": 3.17,
        "gpa_1_2": 3.414,
        "gpa_2_1": 3.233,
        "gpa_2_2": 3.369,
        "gpa_3_1": 3.54,
        "cgpa": 3.35
    },
    {
        "name": "UMME SAMIHA ISLAM ",
        "roll": "2031038",
        "gpa_1_1": 3.32,
        "gpa_1_2": 3.428,
        "gpa_2_1": 3.331,
        "gpa_2_2": 3.506,
        "gpa_3_1": 3.78,
        "cgpa": 3.47
    },
    {
        "name": "ASHIKA RAHMAN PANNA",
        "roll": "2031039",
        "gpa_1_1": 3.22,
        "gpa_1_2": 3.434,
        "gpa_2_1": 3.273,
        "gpa_2_2": 3.528,
        "gpa_3_1": 3.79,
        "cgpa": 3.45
    },
    {
        "name": "MST. ANANNA AFRIN ",
        "roll": "2031040",
        "gpa_1_1": 3.44,
        "gpa_1_2": 3.592,
        "gpa_2_1": 3.64,
        "gpa_2_2": 3.864,
        "gpa_3_1": 3.91,
        "cgpa": 3.69
    },
    {
        "name": "ORPA AHMED ",
        "roll": "2031041",
        "gpa_1_1": 3.53,
        "gpa_1_2": 3.704,
        "gpa_2_1": 3.552,
        "gpa_2_2": 3.739,
        "gpa_3_1": 3.89,
        "cgpa": 3.68
    },
    {
        "name": "KHADIJA AKTER ",
        "roll": "2031042",
        "gpa_1_1": 3.36,
        "gpa_1_2": 3.559,
        "gpa_2_1": 3.512,
        "gpa_2_2": 3.682,
        "gpa_3_1": 3.89,
        "cgpa": 3.6
    },
    {
        "name": "JANNATUL MAOUA PROME ",
        "roll": "2031043",
        "gpa_1_1": 2.7,
        "gpa_1_2": 3.039,
        "gpa_2_1": 3.07,
        "gpa_2_2": 3.267,
        "gpa_3_1": 3.41,
        "cgpa": 3.1
    },
    {
        "name": "MAHMUDA JANNAT OWYSHE",
        "roll": "2031044",
        "gpa_1_1": 3.1,
        "gpa_1_2": 3.289,
        "gpa_2_1": 2.797,
        "gpa_2_2": 3.483,
        "gpa_3_1": 2.9,
        "cgpa": 3.11
    },
    {
        "name": "RUKAIYA HOSSAIN ",
        "roll": "2031045",
        "gpa_1_1": 3.17,
        "gpa_1_2": 3.454,
        "gpa_2_1": 3.326,
        "gpa_2_2": 3.619,
        "gpa_3_1": 3.48,
        "cgpa": 3.41
    },
    {
        "name": "MAHFUZA KHATUN ",
        "roll": "2031046",
        "gpa_1_1": 2.9,
        "gpa_1_2": 3.072,
        "gpa_2_1": 2.953,
        "gpa_2_2": 3.483,
        "gpa_3_1": 3.49,
        "cgpa": 3.18
    },
    {
        "name": "AUTHOY BISWAS BIDDA ",
        "roll": "2031048",
        "gpa_1_1": 3.25,
        "gpa_1_2": 3.211,
        "gpa_2_1": 3.07,
        "gpa_2_2": 3.631,
        "gpa_3_1": 3.58,
        "cgpa": 3.35
    }
].map(student => {
    let imageUrl = studentImageMap[student.roll];
    if (studentsUsingSharedImage.includes(student.roll)) {
        imageUrl = sharedImageUrl;
    }
    // Fallback for any students not explicitly mapped
    if (!imageUrl) {
        imageUrl = "https://placehold.co/96x96/aabbcc/ffffff?text=No+Image"; // Generic placeholder
    }
    // Calculate new CGPA as the average of the five semesters
    const totalGpa = (student.gpa_1_1 + student.gpa_1_2 + student.gpa_2_1 + student.gpa_2_2 + student.gpa_3_1);
    const newCgpa = (totalGpa / 5).toFixed(2);
    return { ...student, imageUrl, cgpa: parseFloat(newCgpa) };
});

// Define a custom color palette for the charts for a modern look
const chartColors = ['#6366F1', '#EC4899', '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6'];

// Custom Tooltip for CGPA Distribution
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        // Format students list to fit without a scrollbar
        const studentRolls = data.students.map(student => student.roll).join(', ');
        return (
            <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-xl text-sm max-w-sm">
                <p className="font-bold text-gray-800 mb-2">{`CGPA \u2265 ${data.threshold}`}</p>
                <p className="text-gray-700 mb-2">{`Number of Students: ${data.count}`}</p>
                <p className="font-semibold text-gray-700 mb-1">Student Rolls:</p>
                <div className="text-gray-600 break-words">
                    {studentRolls.length > 0 ? (
                        <span>{studentRolls}</span>
                    ) : (
                        'No students in this range.'
                    )}
                </div>
            </div>
        );
    }
    return null;
};

// Comparison View Component
const ComparisonView = ({ comparedStudents, onBack }) => {
    // Prepare data for comparison chart
    const comparisonChartData = useMemo(() => {
        const semesterOrder = ['1_1', '1_2', '2_1', '2_2', '3_1'];
        const semesterNames = {
            '1_1': 'First Semester',
            '1_2': 'Second Semester',
            '2_1': 'Third Semester',
            '2_2': 'Fourth Semester',
            '3_1': 'Fifth Semester'
        };
        
        // Create an array with one object per semester
        return semesterOrder.map(sem => {
            const semesterKey = `gpa_${sem}`;
            const result = {
                semester: semesterNames[sem]
            };
            
            // Add each student's GPA for this semester
            comparedStudents.forEach((student, index) => {
                result[student.roll] = student[semesterKey];
            });
            
            return result;
        });
    }, [comparedStudents]);

    // Dynamic Y-axis domain for the comparison chart
    const comparisonGpaDomain = useMemo(() => {
        if (!comparisonChartData.length) return [1.0, 4.0];
        try {
            const allGpas = comparisonChartData.flatMap(d =>
                Object.keys(d)
                      .filter(key => key !== 'semester' && d[key] !== null && d[key] !== undefined)
                      .map(key => d[key])
            );
            if (allGpas.length === 0) return [1.0, 4.0];
            const minGpa = Math.min(...allGpas);
            const maxGpa = Math.max(...allGpas);
            if (isNaN(minGpa) || isNaN(maxGpa)) {
                return [1.0, 4.0];
            }
            const padding = 0.1;
            const finalMin = Math.max(0, minGpa - padding);
            const finalMax = Math.min(4.0, maxGpa + padding);
            if (finalMin === finalMax) {
                return [Math.max(0, finalMin - 0.5), Math.min(4.0, finalMax + 0.5)];
            }
            return [finalMin, finalMax];
        } catch (error) {
            console.error("Error calculating comparison GPA domain:", error);
            return [1.0, 4.0];
        }
    }, [comparisonChartData]);

    // Find the highest value in each category for highlighting
    const findHighestInCategory = useCallback((category) => {
        let highestValue = -Infinity;
        let highestStudents = [];
        
        comparedStudents.forEach(student => {
            let value;
            if (category === 'cgpa') {
                value = student.cgpa;
            } else {
                value = student[category];
            }
            
            if (value > highestValue) {
                highestValue = value;
                highestStudents = [student.roll];
            } else if (value === highestValue) {
                highestStudents.push(student.roll);
            }
        });
        
        return highestStudents;
    }, [comparedStudents]);

    // Get colors for the lines
    const getLineColor = (index) => {
        return chartColors[index % chartColors.length];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="mb-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
                >
                    ← Back to Dashboard
                </button>

                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-6 text-white text-center rounded-t-2xl">
                        <h1 className="text-3xl font-extrabold tracking-tight">
                            Student Comparison
                        </h1>
                        <p className="mt-2 text-lg opacity-90">
                            Comparing {comparedStudents.length} students
                        </p>
                    </div>

                    {/* Comparison Chart */}
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 text-center">
                            GPA Trend Comparison
                        </h2>
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart
                                data={comparisonChartData}
                                margin={{ top: 20, right: 60, left: 20, bottom: 40 }}
                            >
                                <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="semester"
                                    tickMargin={10}
                                    tick={{ fontSize: 12, fill: '#666' }}
                                    axisLine={{ stroke: '#ccc' }}
                                    tickLine={{ stroke: '#ccc' }}
                                />
                                <YAxis
                                    domain={comparisonGpaDomain}
                                    tickCount={5}
                                    tickMargin={10}
                                    tick={{ fontSize: 12, fill: '#666' }}
                                    axisLine={{ stroke: '#ccc' }}
                                    tickLine={{ stroke: '#ccc' }}
                                    tickFormatter={(value) => value.toFixed(2)}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #ddd',
                                        padding: '8px',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                                    }}
                                    cursor={{ stroke: 'rgba(0,0,0,0.1)' }}
                                />
                                <Legend 
                                    align="right" 
                                    verticalAlign="middle" 
                                    layout="vertical"
                                    wrapperStyle={{
                                        right: 0,
                                        top: '50%',
                                        transform: 'translateY(-50%)'
                                    }}
                                />
                                
                                {comparedStudents.map((student, index) => (
                                    <Line
                                        key={student.roll}
                                        type="monotone"
                                        dataKey={student.roll}
                                        stroke={getLineColor(index)}
                                        strokeWidth={3}
                                        dot={{ stroke: getLineColor(index), strokeWidth: 2, r: 4 }}
                                        activeDot={{ r: 6, stroke: getLineColor(index), strokeWidth: 2 }}
                                        name={`${student.name} (${student.roll})`}
                                    />
                                ))}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Comparison Table */}
                    <div className="p-6 mt-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 text-center">
                            Detailed Comparison
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        {comparedStudents.map(student => (
                                            <th 
                                                key={student.roll}
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {student.name} <br />
                                                <span className="font-normal text-sm">({student.roll})</span>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {/* First Semester */}
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            First Semester
                                        </td>
                                        {comparedStudents.map(student => (
                                            <td 
                                                key={student.roll} 
                                                className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${findHighestInCategory('gpa_1_1').includes(student.roll) ? 'bg-green-50' : ''}`}
                                            >
                                                {student.gpa_1_1 !== undefined ? 
                                                    `${student.gpa_1_1.toFixed(3)}` : 
                                                    'N/A'}
                                            </td>
                                        ))}
                                    </tr>
                                    
                                    {/* Second Semester */}
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            Second Semester
                                        </td>
                                        {comparedStudents.map(student => (
                                            <td 
                                                key={student.roll} 
                                                className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${findHighestInCategory('gpa_1_2').includes(student.roll) ? 'bg-green-50' : ''}`}
                                            >
                                                {student.gpa_1_2 !== undefined ? 
                                                    `${student.gpa_1_2.toFixed(3)}` : 
                                                    'N/A'}
                                            </td>
                                        ))}
                                    </tr>
                                    
                                    {/* Third Semester */}
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            Third Semester
                                        </td>
                                        {comparedStudents.map(student => (
                                            <td 
                                                key={student.roll} 
                                                className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${findHighestInCategory('gpa_2_1').includes(student.roll) ? 'bg-green-50' : ''}`}
                                            >
                                                {student.gpa_2_1 !== undefined ? 
                                                    `${student.gpa_2_1.toFixed(3)}` : 
                                                    'N/A'}
                                            </td>
                                        ))}
                                    </tr>
                                    
                                    {/* Fourth Semester */}
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            Fourth Semester
                                        </td>
                                        {comparedStudents.map(student => (
                                            <td 
                                                key={student.roll} 
                                                className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${findHighestInCategory('gpa_2_2').includes(student.roll) ? 'bg-green-50' : ''}`}
                                            >
                                                {student.gpa_2_2 !== undefined ? 
                                                    `${student.gpa_2_2.toFixed(3)}` : 
                                                    'N/A'}
                                            </td>
                                        ))}
                                    </tr>
                                    
                                    {/* Fifth Semester */}
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            Fifth Semester
                                        </td>
                                        {comparedStudents.map(student => (
                                            <td 
                                                key={student.roll} 
                                                className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${findHighestInCategory('gpa_3_1').includes(student.roll) ? 'bg-green-50' : ''}`}
                                            >
                                                {student.gpa_3_1 !== undefined ? 
                                                    `${student.gpa_3_1.toFixed(3)}` : 
                                                    'N/A'}
                                            </td>
                                        ))}
                                    </tr>
                                    
                                    {/* CGPA */}
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                            CGPA
                                        </td>
                                        {comparedStudents.map(student => (
                                            <td 
                                                key={student.roll} 
                                                className={`px-6 py-4 whitespace-nowrap text-sm font-bold text-indigo-600 ${findHighestInCategory('cgpa').includes(student.roll) ? 'bg-green-50' : ''}`}
                                            >
                                                {student.cgpa}
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Compare Modal Component
const CompareModal = ({ isOpen, onClose, studentData, onCompare }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudents, setSelectedStudents] = useState([]);

    // Filter students based on search term
    const filteredStudents = useMemo(() => {
        if (!searchTerm.trim()) return [];
        
        return studentData.filter(student =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.roll.includes(searchTerm)
        );
    }, [searchTerm, studentData]);

    // Handle adding a student to comparison list
    const handleAddStudent = useCallback((student) => {
        if (!selectedStudents.find(s => s.roll === student.roll)) {
            setSelectedStudents(prev => [...prev, student]);
        }
        setSearchTerm('');
    }, [selectedStudents]);

    // Handle removing a student from comparison list
    const handleRemoveStudent = useCallback((roll) => {
        setSelectedStudents(prev => prev.filter(s => s.roll !== roll));
    }, []);

    // Start comparison
    const handleStartComparison = useCallback(() => {
        if (selectedStudents.length >= 2) {
            onCompare(selectedStudents);
            onClose();
        }
    }, [selectedStudents, onCompare, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-6 text-white">
                    <h2 className="text-2xl font-bold">Compare Students</h2>
                    <p className="opacity-90">Select at least 2 students to compare</p>
                </div>
                
                <div className="p-6">
                    {/* Search Section */}
                    <div className="mb-6">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Search by name or roll number..."
                                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        
                        {/* Search Results */}
                        {searchTerm && filteredStudents.length > 0 && (
                            <div className="mt-4 max-h-40 overflow-y-auto border border-gray-200 rounded-lg">
                                {filteredStudents.map(student => (
                                    <div
                                        key={student.roll}
                                        className="p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer flex justify-between items-center"
                                        onClick={() => handleAddStudent(student)}
                                    >
                                        <div>
                                            <span className="font-medium">{student.name}</span>
                                            <span className="text-gray-500 ml-2">({student.roll})</span>
                                        </div>
                                        <button 
                                            className="text-indigo-600 text-sm px-3 py-1 bg-indigo-50 rounded-full hover:bg-indigo-100"
                                        >
                                            Add
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* Selected Students */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">Selected Students ({selectedStudents.length})</h3>
                        {selectedStudents.length === 0 ? (
                            <p className="text-gray-500 text-center py-4 bg-gray-50 rounded-lg">
                                No students selected. Search and add students above.
                            </p>
                        ) : (
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                {selectedStudents.map(student => (
                                    <div 
                                        key={student.roll}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                    >
                                        <div>
                                            <span className="font-medium">{student.name}</span>
                                            <span className="text-gray-500 ml-2">({student.roll})</span>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveStudent(student.roll)}
                                            className="text-red-500 hover:text-red-700 text-xl font-bold"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-4 pt-4 border-t">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleStartComparison}
                            disabled={selectedStudents.length < 2}
                            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors ${
                                selectedStudents.length >= 2
                                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            Compare ({selectedStudents.length})
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStudents, setSearchStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [isMobile, setIsMobile] = useState(false);
    const [chartError, setChartError] = useState(false);
    const [showCompareModal, setShowCompareModal] = useState(false);
    const [showComparisonView, setShowComparisonView] = useState(false);
    const [comparedStudents, setComparedStudents] = useState([]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Tailwind's 'md' breakpoint is 768px
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial value
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Reset chart error when student changes
    useEffect(() => {
        setChartError(false);
    }, [selectedStudent]);

    // FIXED PRINT FUNCTION
    const handlePrintResult = useCallback(() => {
        if (!selectedStudent) return;
        // Helper to get grade or 'N/A'
        const getGrade = (gpaKey, gradeKey) => {
            const gpaValue = selectedStudent[gpaKey];
            if (gpaValue !== undefined && gpaValue !== null) {
                const gradeValue = selectedStudent[gradeKey] || 'N/A';
                return `${gpaValue.toFixed(3)} (${gradeValue})`;
            }
            return 'N/A';
        };
        const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Student Result Slip</title>
                <style>
                    html, body {
                        height: 100%; /* Force html and body to take full height */
                        margin: 0;
                        padding: 0;
                        overflow: hidden; /* Hide scrollbars if content overflows */
                    }
                    body {
                        font-family: 'Courier New', monospace;
                        -webkit-print-color-adjust: exact;
                        display: flex;
                        justify-content: center;
                        align-items: flex-start;
                        background-color: #f0f0f0;
                    }
                    .print-page {
                        width: 210mm; /* A4 width */
                        height: 297mm; /* A4 height to ensure single page */
                        margin: 0;
                        padding: 15mm; /* Reduced padding for more content space */
                        box-sizing: border-box;
                        background-color: #fff;
                        color: #000;
                        position: relative;
                        box-shadow: none;
                        border-radius: 0;
                        border: none;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        flex-shrink: 0; /* Prevent shrinking */
                    }
                    .header-section {
                        text-align: center;
                        margin-bottom: 20px; /* Reduced margin */
                    }
                    .header-section h1 {
                        font-size: 22px; /* Further reduced font size */
                        font-weight: bold;
                        margin-bottom: 5px;
                    }
                    .header-section p {
                        font-size: 12px; /* Further reduced font size */
                        color: #333;
                        margin-bottom: 3px;
                    }
                    .details-section {
                        margin-bottom: 20px; /* Reduced margin */
                        padding-bottom: 10px; /* Reduced padding */
                        border-bottom: 1px dashed #ccc;
                    }
                    .details-section p {
                        font-size: 14px; /* Reduced font size */
                        margin-bottom: 5px; /* Reduced margin */
                    }
                    .details-section span {
                        font-weight: bold;
                        color: #000;
                        display: inline-block;
                        width: 90px; /* Adjusted width */
                    }
                    .grades-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 15px; /* Reduced margin */
                    }
                    .grades-table th, .grades-table td {
                        border: 1px solid #ddd;
                        padding: 6px 8px; /* Reduced padding */
                        text-align: left;
                        font-size: 14px; /* Reduced font size */
                    }
                    .grades-table th {
                        background-color: #f9f9f9;
                        font-weight: bold;
                    }
                    .footer-section {
                        text-align: center;
                        font-size: 10px; /* Reduced font size */
                        color: #555;
                        margin-top: auto;
                        padding-top: 10px; /* Reduced padding */
                        border-top: 1px dashed #ccc;
                    }
                    @page {
                        margin: 0;
                    }
                </style>
            </head>
            <body>
                <div class="print-page">
                    <div> <div class="header-section">
                            <h1>Islamic University Bangladesh</h1>
                            <p>Student Result Slip</p>
                            <p>Environmental Science and Geography</p>
                            <p>${new Date().toLocaleDateString()}</p>
                        </div>
                        <div class="details-section">
                            <p><span>Name:</span> ${selectedStudent.name}</p>
                            <p><span>Roll:</span> ${selectedStudent.roll}</p>
                            <p><span>CGPA:</span> ${selectedStudent.cgpa}</p>
                        </div>
                        <table class="grades-table">
                            <thead>
                                <tr>
                                    <th>Semester</th>
                                    <th>GPA</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>First Semester</td>
                                    <td>${selectedStudent.gpa_1_1 !== undefined ? selectedStudent.gpa_1_1.toFixed(3) : 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td>Second Semester</td>
                                    <td>${selectedStudent.gpa_1_2 !== undefined ? selectedStudent.gpa_1_2.toFixed(3) : 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td>Third Semester</td>
                                    <td>${selectedStudent.gpa_2_1 !== undefined ? selectedStudent.gpa_2_1.toFixed(3) : 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td>Fourth Semester</td>
                                    <td>${selectedStudent.gpa_2_2 !== undefined ? selectedStudent.gpa_2_2.toFixed(3) : 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td>Fifth Semester</td>
                                    <td>${selectedStudent.gpa_3_1 !== undefined ? selectedStudent.gpa_3_1.toFixed(3) : 'N/A'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="footer-section">
                        <p>Developed by <a href="https://www.linkedin.com/in/parvej-iu/" target="_blank" style="color: #555; text-decoration: none;">MD. PARVEJ HOSSAIN</a>, ESG 20-21</p>
                    </div>
                </div>
            </body>
            </html>
        `;
        const printWindow = window.open('', '', 'height=800,width=600');
        printWindow.document.write(printContent);
        printWindow.document.close();
        // Wait for the document to load before printing
        printWindow.onload = function() {
            printWindow.print();
            // Do not close the window - let the user close it when they're done
        };
    }, [selectedStudent]);

    // Effect to filter students based on search term
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSearchStudents([]);
            setSelectedStudent(null); // Clear selected student when search is empty
            return;
        }
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const results = studentData.filter(student =>
            student.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            student.roll.includes(lowerCaseSearchTerm)
        );
        setSearchStudents(results);
        // If only one result, automatically select it
        if (results.length === 1) {
            setSelectedStudent(results[0]);
        } else {
            setSelectedStudent(null);
        }
    }, [searchTerm]);

    // Function to handle sorting
    const sortedStudentData = useMemo(() => {
        let sortableItems = [...studentData];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];
                // Handle GPA/CGPA values as numbers for proper sorting
                if (sortConfig.key.includes('gpa') || sortConfig.key === 'cgpa') {
                    aValue = parseFloat(aValue) || 0;
                    bValue = parseFloat(bValue) || 0;
                } else if (sortConfig.key === 'roll') {
                    // Treat roll as number for sorting
                    aValue = parseInt(aValue, 10) || 0;
                    bValue = parseInt(bValue, 10) || 0;
                }
                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [studentData, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIndicator = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? ' \u25b2' : ' \u25bc';
        }
        return '';
    };

    // Prepare data for Grade Distribution Bar Chart
    const gradeDistributionData = useMemo(() => {
        const gradeCounts = {};
        const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F']; // Define order of grades
        studentData.forEach(student => {
            // Collect all grades from all semesters
            ['grade_1_1', 'grade_1_2', 'grade_2_1', 'grade_2_2', 'grade_3_1'].forEach(gradeKey => {
                const grade = student[gradeKey];
                if (grade) {
                    gradeCounts[grade] = (gradeCounts[grade] || 0) + 1;
                }
            });
        });
        // Convert to array of objects for recharts, maintaining order
        return grades
            .filter(grade => gradeCounts[grade] > 0) // Only include grades that exist in data
            .map(grade => ({
                grade: grade,
                count: gradeCounts[grade] || 0
            }));
    }, []);

    // Prepare data for CGPA Trend Line Chart (Overall Average)
    const cgpaTrendData = useMemo(() => {
        const semesterData = {}; // { '1-1': { totalGpa: 0, count: 0 }, ... }
        studentData.forEach(student => {
            // Aggregate GPA for each semester
            ['1_1', '1_2', '2_1', '2_2', '3_1'].forEach(sem => {
                const gpaKey = `gpa_${sem}`;
                const semesterName = sem.replace('_', '-'); // Format for display
                if (student[gpaKey] !== undefined) {
                    if (!semesterData[semesterName]) {
                        semesterData[semesterName] = { totalGpa: 0, count: 0 };
                    }
                    semesterData[semesterName].totalGpa += student[gpaKey];
                    semesterData[semesterName].count += 1;
                }
            });
        });
        // Calculate average GPA for each semester
        const trend = Object.keys(semesterData).map(semester => ({
            semester: semester,
            averageGpa: (semesterData[semester].totalGpa / semesterData[semester].count).toFixed(2)
        }));
        // Map semester names for display
        const semesterDisplayNames = {
            '1-1': 'First Semester',
            '1-2': 'Second Semester',
            '2-1': 'Third Semester',
            '2-2': 'Fourth Semester',
            '3-1': 'Fifth Semester',
        };
        // Sort semesters for proper line chart display and apply display names
        const semesterOrder = ['1-1', '1-2', '2-1', '2-2', '3-1'];
        return trend.sort((a, b) => semesterOrder.indexOf(a.semester) - semesterOrder.indexOf(b.semester))
                .map(item => ({ ...item, semester: semesterDisplayNames[item.semester] || item.semester }));
    }, []);

    // Prepare data for Selected Student's GPA Trend Line Chart
    const selectedStudentGpaTrendData = useMemo(() => {
        if (!selectedStudent) return [];
        const trend = [];
        const semesterOrder = ['1_1', '1_2', '2_1', '2_2', '3_1'];
        // Process each semester in order
        for (const sem of semesterOrder) {
            const gpaKey = `gpa_${sem}`;
            const semesterName = sem.replace('_', '-');
            let gpaValue = selectedStudent[gpaKey];
            // Ensure gpaValue is a valid number
            if (typeof gpaValue === 'string') {
                gpaValue = parseFloat(gpaValue);
            }
            // Only include valid GPA values
            if (typeof gpaValue === 'number' && !isNaN(gpaValue) && gpaValue >= 0 && gpaValue <= 4.0) {
                trend.push({
                    semester: semesterName,
                    gpa: gpaValue
                });
            }
        }
        // Map semester names for display
        const semesterDisplayNames = {
            '1-1': 'First Semester',
            '1-2': 'Second Semester',
            '2-1': 'Third Semester',
            '2-2': 'Fourth Semester',
            '3-1': 'Fifth Semester',
        };
        // Sort by semester order
        return trend.sort((a, b) => {
            const orderA = semesterOrder.indexOf(`gpa_${a.semester.replace('-', '_')}`);
            const orderB = semesterOrder.indexOf(`gpa_${b.semester.replace('-', '_')}`);
            return orderA - orderB;
        }).map(item => ({
            ...item,
            semester: semesterDisplayNames[item.semester] || item.semester
        }));
    }, [selectedStudent]);

    // Dynamic Y-axis domain for individual student GPA trend
    const selectedStudentGpaDomain = useMemo(() => {
        if (!selectedStudentGpaTrendData.length) return [1.0, 4.0];
        try {
            const gpas = selectedStudentGpaTrendData.map(d => d.gpa);
            const minGpa = Math.min(...gpas);
            const maxGpa = Math.max(...gpas);
            // Ensure min and max are valid numbers
            if (isNaN(minGpa) || isNaN(maxGpa)) {
                return [1.0, 4.0];
            }
            // Add a small buffer for better visualization.
            // Ensure the domain is at least a small range if min and max are the same.
            const padding = 0.1;
            const finalMin = Math.max(0, minGpa - padding);
            const finalMax = Math.min(4.0, maxGpa + padding);
            // If min and max are the same, expand the domain slightly.
            if (finalMin === finalMax) {
                return [Math.max(0, finalMin - 0.5), Math.min(4.0, finalMax + 0.5)];
            }
            return [finalMin, finalMax];
        } catch (error) {
            console.error("Error calculating GPA domain:", error);
            return [1.0, 4.0];
        }
    }, [selectedStudentGpaTrendData]);

    // Dynamic Y-axis domain for overall average GPA trend
    const overallGpaDomain = useMemo(() => {
        if (!cgpaTrendData.length) return [1.0, 4.0];
        try {
            const gpas = cgpaTrendData.map(d => parseFloat(d.averageGpa));
            const minGpa = Math.min(...gpas);
            const maxGpa = Math.max(...gpas);
            // Ensure min and max are valid numbers
            if (isNaN(minGpa) || isNaN(maxGpa)) {
                return [1.0, 4.0];
            }
            // Add a small buffer to min/max for better visualization, ensuring it doesn't go below 0 or above 4.0
            return [
                Math.max(0, minGpa - 0.1),
                Math.min(4.0, maxGpa + 0.1)
            ];
        } catch (error) {
            console.error("Error calculating overall GPA domain:", error);
            return [1.0, 4.0];
        }
    }, [cgpaTrendData]);

    // Cumulative CGPA Distribution
    const cgpaDistributionData = useMemo(() => {
        const thresholds = [2.5, 3.0, 3.25, 3.5, 3.75, 3.8, 3.9];
        return thresholds.map(threshold => {
            const studentsAboveThreshold = studentData.filter(student => student.cgpa >= threshold);
            return {
                threshold: threshold,
                count: studentsAboveThreshold.length,
                students: studentsAboveThreshold.map(s => ({ name: s.name, roll: s.roll }))
            };
        });
    }, []);

    // Calculate overall statistics
    const overallStats = useMemo(() => {
        const cgpAs = studentData.map(s => s.cgpa);
        const maxCGPA = Math.max(...cgpAs);
        const minCGPA = Math.min(...cgpAs);
        const averageCGPA = (cgpAs.reduce((sum, val) => sum + val, 0) / cgpAs.length).toFixed(2);
        return { maxCGPA, minCGPA, averageCGPA };
    }, []);

    // Error-safe chart renderer
    const renderStudentGpaChart = useCallback(() => {
        if (chartError) {
            return (
                <div className="text-center text-red-500 p-4">
                    <p>Error displaying GPA chart. Please try another student.</p>
                    <button
                        onClick={() => setChartError(false)}
                        className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                        Retry Chart
                    </button>
                </div>
            );
        }
        if (!selectedStudentGpaTrendData.length) {
            return (
                <div className="text-center text-gray-500 p-8">
                    No GPA trend data available for this student.
                </div>
            );
        }
        try {
            return (
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart
                        data={selectedStudentGpaTrendData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                        style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                        <CartesianGrid
                            stroke="#e0e0e0"
                            strokeDasharray="3 3"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="semester"
                            tickMargin={10}
                            tick={{ fontSize: 12, fill: '#666' }}
                            axisLine={{ stroke: '#ccc' }}
                            tickLine={{ stroke: '#ccc' }}
                        />
                        <YAxis
                            domain={selectedStudentGpaDomain}
                            tickCount={5} // Show only 5 ticks for cleaner UI
                            tickMargin={10}
                            tick={{ fontSize: 12, fill: '#666' }}
                            axisLine={{ stroke: '#ccc' }}
                            tickLine={{ stroke: '#ccc' }}
                            tickFormatter={(value, index) => index === 0 ? '' : value.toFixed(2)}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #ddd',
                                padding: '8px',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                            }}
                            cursor={{ stroke: 'rgba(0,0,0,0.1)' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="gpa"
                            stroke="#EC4899"
                            strokeWidth={2}
                            dot={{ stroke: '#EC4899', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, stroke: '#EC4899', strokeWidth: 2 }}
                            name="GPA Trend"
                        />
                    </LineChart>
                </ResponsiveContainer>
            );
        } catch (error) {
            console.error("Chart rendering error:", error);
            setChartError(true);
            return (
                <div className="text-center text-red-500 p-4">
                    Error displaying GPA chart. Please try another student.
                </div>
            );
        }
    }, [selectedStudentGpaTrendData, selectedStudentGpaDomain, chartError]);

    // Handle comparison
    const handleCompare = useCallback((students) => {
        setComparedStudents(students);
        setShowComparisonView(true);
    }, []);

    // Print Table Function
    const handlePrintTable = useCallback(() => {
        // Create a printable version of the table
        const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>All Students Results</title>
                <style>
                    @media print {
                        @page {
                            size: A4;
                            margin: 1cm;
                        }
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                        }
                        .print-container {
                            width: 100%;
                            max-width: 210mm;
                            margin: 0 auto;
                            padding: 20mm;
                            box-sizing: border-box;
                        }
                        .table-header {
                            text-align: center;
                            margin-bottom: 20px;
                        }
                        .table-header h1 {
                            font-size: 18pt;
                            margin: 0;
                        }
                        .table-header p {
                            font-size: 12pt;
                            margin: 5px 0;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin: 0;
                            font-size: 10pt;
                        }
                        th, td {
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
                        }
                        th {
                            background-color: #f2f2f2;
                            font-weight: bold;
                        }
                        tr:nth-child(even) {
                            background-color: #f9f9f9;
                        }
                        .footer {
                            margin-top: 20px;
                            text-align: center;
                            font-size: 10pt;
                            color: #666;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="print-container">
                    <div class="table-header">
                        <h1>ESG 20-21 Result Dashboard</h1>
                        <p>Islamic University Bangladesh</p>
                        <p>Environmental Science and Geography</p>
                        <p>Date: ${new Date().toLocaleDateString()}</p>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Roll</th>
                                <th>First Semester</th>
                                <th>Second Semester</th>
                                <th>Third Semester</th>
                                <th>Fourth Semester</th>
                                <th>Fifth Semester</th>
                                <th>CGPA</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${sortedStudentData.map(student => `
                                <tr>
                                    <td>${student.name}</td>
                                    <td>${student.roll}</td>
                                    <td>${student.gpa_1_1 !== undefined ? student.gpa_1_1.toFixed(3) : 'N/A'}</td>
                                    <td>${student.gpa_1_2 !== undefined ? student.gpa_1_2.toFixed(3) : 'N/A'}</td>
                                    <td>${student.gpa_2_1 !== undefined ? student.gpa_2_1.toFixed(3) : 'N/A'}</td>
                                    <td>${student.gpa_2_2 !== undefined ? student.gpa_2_2.toFixed(3) : 'N/A'}</td>
                                    <td>${student.gpa_3_1 !== undefined ? student.gpa_3_1.toFixed(3) : 'N/A'}</td>
                                    <td>${student.cgpa}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div class="footer">
                        <p>Developed by <a href="https://www.linkedin.com/in/parvej-iu/" target="_blank" style="color: #6366F1;">MD. PARVEJ HOSSAIN</a>, ESG 20-21</p>
                    </div>
                </div>
            </body>
            </html>
        `;
        const printWindow = window.open('', '', 'height=800,width=600');
        printWindow.document.write(printContent);
        printWindow.document.close();
        // Wait for the document to load before printing
        printWindow.onload = function() {
            printWindow.print();
            // Do not close the window - let the user close it when they're done
        };
    }, [sortedStudentData]);

    // If in comparison view, show the comparison page
    if (showComparisonView) {
        return (
            <ComparisonView 
                comparedStudents={comparedStudents} 
                onBack={() => setShowComparisonView(false)} 
            />
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 sm:p-6 font-inter text-gray-800">
            {/* Compare Button - Now using text instead of icon */}
            <button
                onClick={() => setShowCompareModal(true)}
                className="fixed left-6 bottom-6 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 hover:scale-105 z-40"
                style={{
                    width: 'auto',
                    height: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px'
                }}
            >
                Compare Result
            </button>

            {/* Compare Modal */}
            <CompareModal
                isOpen={showCompareModal}
                onClose={() => setShowCompareModal(false)}
                studentData={studentData}
                onCompare={handleCompare}
            />

            <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-6 sm:p-8 text-white text-center rounded-t-2xl">
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                        ESG 20-21 Result Dashboard
                    </h1>
                    <p className="mt-2 text-lg sm:text-xl opacity-90">
                        Islamic University Bangladesh
                    </p>
                </div>
                {/* Search Section - Made Sticky */}
                <div className="sticky top-0 z-10 bg-white p-6 sm:p-8 border-b border-gray-200 shadow-md">
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <input
                            type="text"
                            placeholder="Search by Roll or Name..."
                            className="w-full sm:w-2/3 md:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg transition duration-200 ease-in-out transform hover:scale-105"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            onClick={() => {}}
                            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 ease-in-out transform hover:scale-105"
                        >
                            Search
                        </button>
                    </div>
                    {/* Search Results / Suggestions */}
                    {searchTerm.trim() !== '' && filteredStudents.length > 0 && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-inner max-h-60 overflow-y-auto">
                            <h3 className="text-lg font-semibold mb-3 text-gray-700">Matching Students:</h3>
                            <ul className="space-y-2">
                                {filteredStudents.map(student => (
                                    <li
                                        key={student.roll}
                                        className={`p-3 rounded-md cursor-pointer transition duration-150 ease-in-out ${
                                            selectedStudent?.roll === student.roll
                                                ? 'bg-indigo-100 text-indigo-800 font-medium shadow-md'
                                                : 'bg-white hover:bg-gray-100'
                                        }`}
                                        onClick={() => setSelectedStudent(student)}
                                    >
                                        <span className="font-semibold">{student.name}</span> ({student.roll})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {searchTerm.trim() !== '' && filteredStudents.length === 0 && (
                        <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg shadow-inner text-center">
                            No students found matching "${searchTerm}". Please try a different name or roll.
                        </div>
                    )}
                </div>
                {/* Dashboard Content */}
                <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Conditional rendering based on selectedStudent */}
                    {selectedStudent ? (
                        // Layout when a student is selected
                        <>
                            <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Selected Student Details</h2>
                                <div className="space-y-3 text-lg">
                                    {/* Student Image */}
                                    <img
                                        src={selectedStudent.imageUrl}
                                        alt={`${selectedStudent.name} profile`}
                                        className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src="https://placehold.co/96x96/aabbcc/ffffff?text=No+Image"
                                        }}
                                    />
                                    <p><span className="font-semibold text-purple-700">Name:</span> {selectedStudent.name}</p>
                                    <p><span className="font-semibold text-purple-700">Roll:</span> {selectedStudent.roll}</p>
                                    <p><span className="font-semibold text-purple-700">CGPA:</span> <span className="text-indigo-600 font-bold text-xl">{selectedStudent.cgpa}</span></p>
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <h3 className="font-semibold text-gray-700 mb-2">Semester-wise Grades:</h3>
                                        <ul className="space-y-1">
                                            <li className="flex justify-between">
                                                <span>First Semester:</span>
                                                <span className="font-medium">
                                                    {selectedStudent.gpa_1_1 !== undefined && selectedStudent.gpa_1_1 !== null ?
                                                        `${selectedStudent.gpa_1_1.toFixed(3)}` :
                                                        'N/A'}
                                                </span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Second Semester:</span>
                                                <span className="font-medium">
                                                    {selectedStudent.gpa_1_2 !== undefined && selectedStudent.gpa_1_2 !== null ?
                                                        `${selectedStudent.gpa_1_2.toFixed(3)}` :
                                                        'N/A'}
                                                </span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Third Semester:</span>
                                                <span className="font-medium">
                                                    {selectedStudent.gpa_2_1 !== undefined && selectedStudent.gpa_2_1 !== null ?
                                                        `${selectedStudent.gpa_2_1.toFixed(3)}` :
                                                        'N/A'}
                                                </span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Fourth Semester:</span>
                                                <span className="font-medium">
                                                    {selectedStudent.gpa_2_2 !== undefined && selectedStudent.gpa_2_2 !== null ?
                                                        `${selectedStudent.gpa_2_2.toFixed(3)}` :
                                                        'N/A'}
                                                </span>
                                            </li>
                                             <li className="flex justify-between">
                                                <span>Fifth Semester:</span>
                                                <span className="font-medium">
                                                    {selectedStudent.gpa_3_1 !== undefined && selectedStudent.gpa_3_1 !== null ?
                                                        `${selectedStudent.gpa_3_1.toFixed(3)}` :
                                                        'N/A'}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* Print Result button moved here */}
                                    <button
                                        onClick={handlePrintResult}
                                        className="mt-6 w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 ease-in-out transform hover:scale-105"
                                    >
                                        Print Result
                                    </button>
                                </div>
                            </div>
                            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 text-center" style={{ fontFamily: 'Georgia, serif', color: '#333', fontSize: '2rem' }}>
                                    {selectedStudent.name ? `${selectedStudent.name}'s GPA Trend` : "Student's GPA Trend"}
                                </h2>
                                {renderStudentGpaChart()}
                                {selectedStudent && (
                                    <p className="text-center text-gray-600 text-sm mt-4">
                                        Developed by <a href="https://www.linkedin.com/in/parvej-iu/" target="_blank" rel="noopener noreferrer" style={{ color: '#6366F1', textDecoration: 'underline' }}>MD. PARVEJ HOSSAIN</a>
                                    </p>
                                )}
                            </div>
                        </>
                    ) : (
                        // Layout when no student is selected (Overall Dashboard)
                        <>
                            {/* Overall Statistics (inline) */}
                            <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-4">
                                <div className="text-lg flex flex-wrap justify-around items-center gap-4">
                                    <h2 className="text-2xl font-bold text-gray-800">Overall Statistics:</h2>
                                    <p><span className="font-semibold text-purple-700">Total Students:</span> <span className="text-indigo-600 font-bold">{studentData.length}</span></p>
                                    <p><span className="font-semibold text-purple-700">Highest CGPA:</span> <span className="text-indigo-600 font-bold">{overallStats.maxCGPA}</span></p>
                                    <p><span className="font-semibold text-purple-700">Lowest CGPA:</span> <span className="text-indigo-600 font-bold">{overallStats.minCGPA}</span></p>
                                    <p><span className="font-semibold text-purple-700">Average CGPA:</span> <span className="text-indigo-600 font-bold">{overallStats.averageCGPA}</span></p>
                                </div>
                            </div>
                            {/* Overall Charts - Now 50/50 split */}
                            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Overall Average GPA Trend by Semester */}
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 md:col-span-1">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 text-center">Overall Average GPA Trend by Semester</h2>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart
                                            data={cgpaTrendData}
                                            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                                            style={{ fontFamily: 'Arial, sans-serif' }}
                                        >
                                            <CartesianGrid
                                                stroke="#e0e0e0"
                                                strokeDasharray="3 3"
                                                vertical={false}
                                            />
                                            <XAxis
                                                dataKey="semester"
                                                tickMargin={10}
                                                tick={{ fontSize: 12, fill: '#666' }}
                                                axisLine={{ stroke: '#ccc' }}
                                                tickLine={{ stroke: '#ccc' }}
                                            />
                                            <YAxis
                                                domain={overallGpaDomain}
                                                tickFormatter={(value, index) => index === 0 ? '' : value.toFixed(2)}
                                                tickCount={5} // Show only 5 ticks for cleaner UI
                                                tickMargin={10}
                                                tick={{ fontSize: 12, fill: '#666' }}
                                                axisLine={{ stroke: '#ccc' }}
                                                tickLine={{ stroke: '#ccc' }}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: '#fff',
                                                    border: '1px solid #ddd',
                                                    padding: '8px',
                                                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                                                }}
                                                cursor={{ stroke: 'rgba(0,0,0,0.1)' }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="averageGpa"
                                                stroke="#EC4899"
                                                strokeWidth={2}
                                                dot={{ stroke: '#EC4899', strokeWidth: 2, r: 4 }}
                                                activeDot={{ r: 6, stroke: '#EC4899', strokeWidth: 2 }}
                                                name="Average GPA"
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                {/* Cumulative CGPA Distribution */}
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 md:col-span-1">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 text-center">Cumulative CGPA Distribution</h2>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart
                                            data={cgpaDistributionData}
                                            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                                        >
                                            <CartesianGrid
                                                stroke="#e0e0e0"
                                                strokeDasharray="3 3"
                                                vertical={false}
                                            />
                                            <XAxis
                                                dataKey="threshold"
                                                tickMargin={10}
                                                tick={{ fontSize: 12, fill: '#666' }}
                                                axisLine={{ stroke: '#ccc' }}
                                                tickLine={{ stroke: '#ccc' }}
                                            />
                                            <YAxis
                                                allowDecimals={false}
                                                tickMargin={10}
                                                tick={{ fontSize: 12, fill: '#666' }}
                                                axisLine={{ stroke: '#ccc' }}
                                                tickLine={{ stroke: '#ccc' }}
                                            />
                                            <Tooltip
                                                content={<CustomTooltip />}
                                                cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                                                position={{ x: 40, y: -20 }} // Position tooltip at top right of cursor
                                            />
                                            <Bar
                                                dataKey="count"
                                                fill="#10B981"
                                                name="Students"
                                                radius={[10, 10, 0, 0]}
                                                barSize={40} // Increased bar width
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </>
                    )}
                    {/* Total Students Result Table - Only show if no student selected */}
                    {!selectedStudent && (
                        <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-lg border border-gray-200 mt-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">All Student Results</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                                onClick={() => requestSort('name')}
                                            >
                                                Name {getSortIndicator('name')}
                                            </th>
                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                                onClick={() => requestSort('roll')}
                                            >
                                                Roll {getSortIndicator('roll')}
                                            </th>
                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                                onClick={() => requestSort('gpa_1_1')}
                                            >
                                                First Semester {getSortIndicator('gpa_1_1')}
                                            </th>
                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                                onClick={() => requestSort('gpa_1_2')}
                                            >
                                                Second Semester {getSortIndicator('gpa_1_2')}
                                            </th>
                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                                onClick={() => requestSort('gpa_2_1')}
                                            >
                                                Third Semester {getSortIndicator('gpa_2_1')}
                                            </th>
                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                                onClick={() => requestSort('gpa_2_2')}
                                            >
                                                Fourth Semester {getSortIndicator('gpa_2_2')}
                                            </th>
                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                                onClick={() => requestSort('gpa_3_1')}
                                            >
                                                Fifth Semester {getSortIndicator('gpa_3_1')}
                                            </th>
                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                                onClick={() => requestSort('cgpa')}
                                            >
                                                CGPA {getSortIndicator('cgpa')}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">{
                                        sortedStudentData.map((student) => (
                                            <tr key={student.roll} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <div className="flex items-center space-x-3">
                                                        <img
                                                            src={student.imageUrl}
                                                            alt={`${student.name} profile`}
                                                            className="h-8 w-8 rounded-full object-cover"
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = "https://placehold.co/32x32/aabbcc/ffffff?text=No+Image";
                                                            }}
                                                        />
                                                        <span>{student.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.roll}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {student.gpa_1_1 !== undefined ?
                                                        `${student.gpa_1_1.toFixed(3)}` :
                                                        'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {student.gpa_1_2 !== undefined ?
                                                        `${student.gpa_1_2.toFixed(3)}` :
                                                        'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {student.gpa_2_1 !== undefined ?
                                                        `${student.gpa_2_1.toFixed(3)}` :
                                                        'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {student.gpa_2_2 !== undefined ?
                                                        `${student.gpa_2_2.toFixed(3)}` :
                                                        'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {student.gpa_3_1 !== undefined ?
                                                        `${student.gpa_3_1.toFixed(3)}` :
                                                        'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-indigo-600">{student.cgpa}</td>
                                            </tr>
                                        ))
                                    }</tbody>
                                </table>
                            </div>
                            {/* Print Table Button */}
                            <div className="mt-4 text-center">
                                <button
                                    onClick={handlePrintTable}
                                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                                >
                                    Print Table
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default App;
