import Instance from './axios.js'


// -------------------- Achievements -------------------- //
export const getAllachievements = async () => {
    try {
        const response = await Instance.get('/achivement/get-achivements');
        return response;
    } catch (error) {
        throw error;
    }
};

export const addAchievement = async (data) => {
    try {
        const response = await Instance.post('/achivement/add-achivement', data);
        return response;
    }
    catch (error) {
        throw error;
    }
}

// -------------------- Placements -------------------- //

export const getAllPlacements = async () => {
    try {
        const response = await Instance.get('/placement/get-placement');
        return response;
    } catch (error) {
        throw error;
    }
};

export const addPlacement = async (data) => {
    try {
        const response = await Instance.post('/placement/add-placement', data);
        return response;
    }
    catch (error) {
        throw error;
    }
}

// -------------------- startups -------------------- //

export const addStartup = async (data) => {
    try {
        const response = await Instance.post('/startup/add-startup', data);
        return response;
    }
    catch (error) {
        throw error;
    }
}

export const getAllStartups = async () => {
    try {
        const response = await Instance.get('/startup/get-startup');
        return response;
    } catch (error) {
        throw error;
    }
};

// -------------------- users -------------------- //
export const getAllUsers = async () => {
    try {
        const response = await Instance.get('/user/get-user');
        return response;
    } catch (error) {
        throw error;
    }
};

export const addUser = async (data) => {
    try {
        const response = await Instance.post('/user/add-user', data);
        return response;
    }
    catch (error) {
        throw error;
    }
};


// -------------------- Books -------------------- //

export const getAllBooks = async () => {
    try {
        const response = await Instance.get('/book/get-book');
        return response;
    } catch (error) {
        throw error;
    }
};

export const addBook = async (data) => {
    try {
        const response = await Instance.post('/book/add-book', data);
        return response;
    }
    catch (error) {
        throw error;
    }
};


// -------------------- Clubs -------------------- //

export const getAllClubs = async () => {
    try {
        const response = await Instance.get('/club/get-club');
        return response;
    } catch (error) {
        throw error;
    }
};

export const addClub = async (data) => {
    try {
        const response = await Instance.post('/club/add-club', data);
        return response;
    }
    catch (error) {
        throw error;
    }
};


// -------------------- Departments -------------------- //

export const getAllDepartments = async () => {
    try {
        const response = await Instance.get('/department/get-department');
        return response;
    } catch (error) {
        throw error;
    }
};

export const addDepartment = async (data) => {
    try {
        const response = await Instance.post('/department/add-department', data);
        return response;
    }
    catch (error) {
        throw error;
    }
};

// -------------------- Events -------------------- //

export const getAllEvents = async () => {
    try {
        const response = await Instance.get('/event/get-event');
        return response;
    } catch (error) {
        throw error;
    }
}

export const addEvent = async (data) => {
    try {
        const response = await Instance.post('/event/add-event', data);
        return response;
    }
    catch (error) {
        throw error;
    }
};

// -------------------- Fests -------------------- //

export const getAllFests = async () => {
    try {
        const response = await Instance.get('/fest/get-fests');
        return response;
    } catch (error) {
        throw error;
    }
}

export const addFest = async (data) => {
    try {
        const response = await Instance.post('/fest/add-fest', data);
        return response;
    }
    catch (error) {
        throw error;
    }
};

// -------------------- HostelInfo -------------------- //

export const getAllHostelInfo = async () => {
    try {
        const response = await Instance.get('/hostel/get-hostel');
        return response;
    } catch (error) {
        throw error;
    }
}

export const addHostelInfo = async (data) => {
    try {
        const response = await Instance.post('/hostel/add-hostel', data);
        return response;
    }
    catch (error) {
        throw error;
    }
};

// -------------------- Pyq -------------------- //

export const getAllPyq = async () => {
    try {
        const response = await Instance.get('/pyq/get-pyq');
        return response;
    } catch (error) {
        throw error;
    }
}

export const addPyq = async (data) => {
    try {
        const response = await Instance.post('/pyq/add-pyq', data);
        return response;
    }
    catch (error) {
        throw error;
    }
};

// -------------------- Notes -------------------- //

export const getAllNotes = async () => {
    try {
        const response = await Instance.get('/notes/get-notes');
        return response;
    } catch (error) {
        throw error;
    }
}

export const addNote = async (data) => {
    try {
        const response = await Instance.post('/notes/add-notes', data);
        return response;
    }
    catch (error) {
        throw error;
    }
};

// -------------------- scholership -------------------- //

export const getAllScholarships = async () => {
    try {
        const response = await Instance.get('/scholarship/get-scholarship');
        return response;
    } catch (error) {
        throw error;
    }
}

export const addScholarship = async (data) => {
    try {
        const response = await Instance.post('/scholarship/add-scholarship', data);
        return response;
    }
    catch (error) {
        throw error;
    }
};

//---------------Roles-----------------------
export const addRoles = async (data) => {
    try {
        const response = await Instance.post('/roles/add-roles', data);
        return response;
    }
    catch (error) {
        throw error;
    }
};
// -------------------- AdviceAndDemand-------------------- //

// export const getAllAdviceAndDemand = async () => {
//     try {
//         const response = await Instance.get('/advice/get-advice');
//         return response;
//     } catch (error) {
//         throw error;
//     }
// }

// export const addAdviceAndDemand = async (data) => {
//     try {
//         const response = await Instance.post('/advice/add-advice', data);
//         return response;
//     }
//     catch (error) {
//         throw error;
//     }
// };