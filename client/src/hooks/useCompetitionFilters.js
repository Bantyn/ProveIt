import { useState, useMemo } from 'react';
import { competitions } from '../data/competitions';

export const useCompetitionFilters = () => {
    const [filters, setFilters] = useState({
        category: "All",
        searchValue: "",
        difficulty: "any",
        status: "any",
        prizeRange: "any",
        activeTags: [],
        startDate: "",
        endDate: "",
        sortBy: "popular"
    });

    const updateFilter = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            category: "All",
            searchValue: "",
            difficulty: "any",
            status: "any",
            prizeRange: "any",
            activeTags: [],
            startDate: "",
            endDate: "",
            sortBy: "popular"
        });
    };

    const filteredCompetitions = useMemo(() => {
        return competitions.filter(item => {
            // 1. Search (Title, Problem, Tech Stack)
            if (filters.searchValue) {
                const searchLower = filters.searchValue.toLowerCase();
                const matchesSearch =
                    item.competitionTitle.toLowerCase().includes(searchLower) ||
                    item.problemStatement.toLowerCase().includes(searchLower) ||
                    item.techStack.some(tech => tech.toLowerCase().includes(searchLower));

                if (!matchesSearch) return false;
            }

            // 2. Category
            if (filters.category !== "All" && item.category !== filters.category) return false;

            // 3. Difficulty
            if (filters.difficulty !== "any" && item.difficulty !== filters.difficulty) return false;

            // 4. Status
            if (filters.status !== "any" && item.status !== filters.status) return false;

            // 5. Active Tags
            if (filters.activeTags && filters.activeTags.length > 0) {
                const hasTag = filters.activeTags.some(tag =>
                    item.techStack.some(tech => tech.toLowerCase().includes(tag.toLowerCase()))
                );
                if (!hasTag) return false;
            }

            // 6. Date Range
            if (filters.startDate && new Date(item.deadline) < new Date(filters.startDate)) return false;
            if (filters.endDate && new Date(item.deadline) > new Date(filters.endDate)) return false;

            // 7. Prize Range
            if (filters.prizeRange !== "any") {
                const prizeNum = parseInt(item.prizePool.replace(/[^0-9]/g, ''));
                switch (filters.prizeRange) {
                    case "micro": // Under 10k
                        if (prizeNum >= 10000) return false;
                        break;
                    case "small": // 10k - 50k
                        if (prizeNum < 10000 || prizeNum > 50000) return false;
                        break;
                    case "medium": // 50k - 200k
                        if (prizeNum < 50000 || prizeNum > 200000) return false;
                        break;
                    case "large": // Over 200k
                        if (prizeNum <= 200000) return false;
                        break;
                }
            }

            return true;
        }).sort((a, b) => {
            switch (filters.sortBy) {
                case "popular":
                    return b.totalParticipants - a.totalParticipants;
                case "rating":
                    return b.views - a.views;
                case "prize":
                    return parseInt(b.prizePool.replace(/[^0-9]/g, '')) - parseInt(a.prizePool.replace(/[^0-9]/g, ''));
                case "newest":
                    return new Date(b.deadline) - new Date(a.deadline);
                case "deadline":
                    return new Date(a.deadline) - new Date(b.deadline);
                case "recent": // Default fallback for some UIs
                    return new Date(b.createdAt) - new Date(a.createdAt);
                default:
                    return 0;
            }
        });
    }, [filters]);

    const activeFilterCount = [
        filters.category !== "All",
        filters.difficulty !== "any",
        filters.status !== "any",
        filters.prizeRange !== "any",
        filters.activeTags.length > 0,
        filters.startDate,
        filters.endDate,
        filters.searchValue
    ].filter(Boolean).length;

    return {
        filters,
        updateFilter,
        clearFilters,
        filteredCompetitions,
        activeFilterCount
    };
};
