import { ExternalLink, Linkedin, MessageCircle, Slack, Twitter } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// Sample data - added more items to demonstrate masonry layout
const appreciationsData = [
    {
        id: 1,
        message: "Amazing work on the frontend architecture! The new dashboard implementation has significantly improved our app's performance. Looking forward to seeing more of your contributions.",
        medium: "linkedin",
        appreciatorName: "John Doe",
        datetime: "2024-03-15T10:30:00Z",
        link: "https://linkedin.com/post/123",
        screenshot: "https://www.contentmarketingup.com/wp-content/uploads/2023/08/slack-screenshot.jpg"
    },
    {
        id: 2,
        message: "Quick bug fix in production! 🚀",
        medium: "slack",
        appreciatorName: "Jane Smith",
        profilePic: "/api/placeholder/40/40",
        datetime: "2024-03-14T15:20:00Z"
    },
    {
        id: 3,
        message: "Your technical insights on microservices architecture were invaluable! Great thread 🧵 Really appreciated the detailed explanation and examples.",
        medium: "twitter",
        appreciatorName: "Mike Johnson",
        datetime: "2024-03-13T09:45:00Z",
        link: "https://twitter.com/mike/status/123",
    },
    {
        id: 4,
        message: "Outstanding presentation!",
        medium: "github",
        appreciatorName: "Sarah Wilson",
        datetime: "2024-03-12T14:30:00Z",
        link: "https://github.com/issues/123"
    },
    {
        id: 5,
        message: "The code review feedback was incredibly helpful. You have a great eye for detail!",
        medium: "github",
        appreciatorName: "Alex Brown",
        datetime: "2024-03-11T16:20:00Z",
    }
];

const Avatar = ({ src, name, className = "" }) => {
    if (src) {
        return (
            <img
                src={src}
                alt={name}
                className={`w-12 h-12 rounded-full border-2 border-white shadow-sm ${className}`}
            />
        );
    }

    const initial = name?.charAt(0)?.toUpperCase() || '?';
    const colors = [
        'bg-pink-500',
        'bg-purple-500',
        'bg-indigo-500',
        'bg-blue-500',
        'bg-green-500',
        'bg-yellow-500',
        'bg-red-500',
        'bg-teal-500'
    ];

    const colorIndex = name?.split('')
        .reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;

    return (
        <div className={`w-12 h-12 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-lg font-semibold text-white ${colors[colorIndex]} ${className}`}>
            {initial}
        </div>
    );
};

const AppreciationWall = () => {
    const [columns, setColumns] = useState(3);

    useEffect(() => {
        const updateColumns = () => {
            if (window.innerWidth < 640) {
                setColumns(1);
            } else if (window.innerWidth < 1024) {
                setColumns(2);
            } else {
                setColumns(3);
            }
        };

        updateColumns();
        window.addEventListener('resize', updateColumns);
        return () => window.removeEventListener('resize', updateColumns);
    }, []);

    const getPlatformStyles = (medium) => {
        switch (medium.toLowerCase()) {
            case 'linkedin':
                return {
                    bgColor: 'bg-blue-50',
                    borderColor: 'border-blue-200',
                    iconBg: 'bg-blue-100',
                    iconColor: 'text-blue-600',
                    hoverBg: 'hover:bg-blue-100'
                };
            case 'twitter':
                return {
                    bgColor: 'bg-sky-50',
                    borderColor: 'border-sky-200',
                    iconBg: 'bg-sky-100',
                    iconColor: 'text-sky-500',
                    hoverBg: 'hover:bg-sky-100'
                };
            case 'slack':
                return {
                    bgColor: 'bg-purple-50',
                    borderColor: 'border-purple-200',
                    iconBg: 'bg-purple-100',
                    iconColor: 'text-purple-500',
                    hoverBg: 'hover:bg-purple-100'
                };
            default:
                return {
                    bgColor: 'bg-gray-50',
                    borderColor: 'border-gray-200',
                    iconBg: 'bg-gray-100',
                    iconColor: 'text-gray-500',
                    hoverBg: 'hover:bg-gray-100'
                };
        }
    };

    const getMediumIcon = (medium) => {
        switch (medium.toLowerCase()) {
            case 'linkedin':
                return <Linkedin size={20} />;
            case 'twitter':
                return <Twitter size={20} />;
            case 'slack':
                return <Slack size={20} />;
            default:
                return <MessageCircle size={20} />;
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Distribute items into columns
    const columnArrays = Array.from({ length: columns }, () => []);
    appreciationsData.forEach((item, index) => {
        columnArrays[index % columns].push(item);
    });

    return (
        <div className="min-h-screen bg-orange-50 py-8 px-4">
            <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
                Appreciation Wall
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {columnArrays.map((column, colIndex) => (
                    <div key={colIndex} className="space-y-6">
                        {column.map((appreciation) => {
                            const styles = getPlatformStyles(appreciation.medium);

                            return (
                                <div
                                    key={appreciation.id}
                                    className={`rounded-xl shadow-md border ${styles.bgColor} ${styles.borderColor} 
                    transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                                >
                                    <div className="p-6">
                                        <div className="flex items-start space-x-4">
                                            <Avatar
                                                src={appreciation.profilePic}
                                                name={appreciation.appreciatorName}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between flex-wrap gap-2">
                                                    <div className="flex items-center space-x-3">
                                                        <h3 className="font-semibold text-gray-800 text-lg truncate">
                                                            {appreciation.appreciatorName}
                                                        </h3>
                                                        <div className={`p-1.5 rounded-full ${styles.iconBg} flex-shrink-0`}>
                                                            <div className={styles.iconColor}>
                                                                {getMediumIcon(appreciation.medium)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className="text-sm text-gray-500">
                                                        {formatDate(appreciation.datetime)}
                                                    </span>
                                                </div>

                                                <p className="mt-3 text-gray-700 text-lg">
                                                    {appreciation.message}
                                                </p>

                                                {appreciation.screenshot && (
                                                    <div className="mt-4 rounded-lg overflow-hidden border border-gray-200">
                                                        <img
                                                            src={appreciation.screenshot}
                                                            alt="Appreciation screenshot"
                                                            className="w-full h-auto"
                                                        />
                                                    </div>
                                                )}

                                                {appreciation.link && (
                                                    <a
                                                        href={appreciation.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`mt-4 inline-flex items-center space-x-2 text-sm ${styles.iconColor} hover:underline`}
                                                    >
                                                        <ExternalLink size={16} />
                                                        <span>View original post</span>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AppreciationWall;