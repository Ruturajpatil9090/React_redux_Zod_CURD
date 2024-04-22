import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Create Action 
export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://6625e2b2052332d55320ee7b.mockapi.io/crud",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Show All Users Read Action
export const showUser = createAsyncThunk(
  "showUser",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://6625e2b2052332d55320ee7b.mockapi.io/crud"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Delete User Action
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://6625e2b2052332d55320ee7b.mockapi.io/crud/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//update User Action
export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    console.log("updated data", data);
    try {
      const response = await axios.put(
        `https://6625e2b2052332d55320ee7b.mockapi.io/crud/${data.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(showUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(showUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        if (id) {
          state.users = state.users.filter((ele) => ele.id !== id)
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((ele) => (
          ele.id === action.payload.id ? action.payload : ele
        ))
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userDetail.reducer;
