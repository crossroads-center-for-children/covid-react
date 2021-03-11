const CREATE_NEW_STUDENT = 'admin/CREATE_NEW_STUDENT';
const CREATE_NEW_PARENT = 'admin/CREATE_NEW_PARENT';
const CREATE_NEW_STAFF = 'admin/CREATE_NEW_STAFF';
const SET_ADD_STUDENT_IS_OPEN = 'admin/SET_ADD_STUDENT_IS_OPEN';
const SET_ADD_PARENT_IS_OPEN = 'admin/SET_ADD_PARENT_IS_OPEN';
const SET_ADD_STAFF_IS_OPEN = 'admin/SET_ADD_STAFF_IS_OPEN';

const initialState = {
  addStudentIsOpen: false,
  addParentIsOpen: false,
  addStaffIsOpen: false,

  newStudent: {
    firstName: '',
    lastName: '',
    room: '',
    parents: [],
  },
};

export const setNewStudent = newStudent => ({ type: CREATE_NEW_STUDENT, newStudent });
export const setNewParent = newParent => ({ type: CREATE_NEW_PARENT, newParent });
export const setNewStaff = newStaff => ({ type: CREATE_NEW_STAFF, newStaff });

export const setAddStudentIsOpen = bool => ({ type: SET_ADD_STUDENT_IS_OPEN, isOpen: bool });
export const setAddParentIsOpen = bool => ({ type: SET_ADD_PARENT_IS_OPEN, isOpen: bool });
export const setAddStaffIsOpen = bool => ({ type: SET_ADD_STAFF_IS_OPEN, isOpen: bool });

export const setParentOnStudent = parent => async (dispatch, getState) => {
  const stateBefore = getState();
  const student = stateBefore.admin.newStudent;
  student.parents.push(parent);
  dispatch(setNewStudent(student));
};

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_NEW_STUDENT:
      return { ...state, newStudent: action.newStudent };

    case CREATE_NEW_PARENT:
      return { ...state, newParent: action.newParent };

    case CREATE_NEW_STAFF:
      return { ...state, newStaff: action.newStaff };

    case SET_ADD_STUDENT_IS_OPEN:
      return { ...state, addStudentIsOpen: action.isOpen };

    case SET_ADD_PARENT_IS_OPEN:
      return { ...state, addParentIsOpen: action.isOpen };

    case SET_ADD_STAFF_IS_OPEN:
      return { ...state, addStaffIsOpen: action.isOpen };

    default:
      return state;
  }
}
