import { createSlice } from '@reduxjs/toolkit';



export const producCardSlice = createSlice({
    name: 'producCard',
    initialState: {
        producActive:{},
        producCard:[]
      
    },
    reducers: {
        getProducCard: ( state, { payload } ) => {
            state.producCard = payload;
        },
        addProducCard: ( state, { payload } ) => {
            state.producCard.push( payload );
           
        },
        onupdateProducActive: ( state, { payload } ) => {
            state.producActive = payload;
           
        },
        onUpdateProducCard: ( state, { payload } ) => {
            state.producCard = state.producCard.map( event => {
                if ( event._id === payload._id ) {
                    return payload;
                }

                return event;
            });
        },

        deleteProducCard: ( state, { payload } ) => {
            state.producCard = state.producCard.filter(element => element._id != payload.id );
        
        }
   
}});


// Action creators are generated for each case reducer function
export const {  getProducCard, addProducCard, onUpdateProducCard,deleteProducCard,onupdateProducActive} = producCardSlice.actions;