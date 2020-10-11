const selectClinics = (state) => state?.clinicDomain?.session?.clinics;

const selectIsGettingClinicsPending = (state) => state?.clinicDomain?.session?.isGettingClinicsPending;

const selectIsAddingClinicPending = (state) => state?.clinicDomain?.session?.isAddingClinicPending;

export default { 
    selectClinics, 
    selectIsGettingClinicsPending,
    selectIsAddingClinicPending
}
