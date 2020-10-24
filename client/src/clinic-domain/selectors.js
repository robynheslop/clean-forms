const selectClinics = (state) => state?.clinicDomain?.clinics;

const selectIsLoadClinicsPending = (state) => state?.clinicDomain?.isLoadClinicsPending;

const selectIsAddClinicPending = (state) => state?.clinicDomain?.isAddClinicPending;
const selectIsAddClinicFailed = (state) => state?.clinicDomain?.isAddClinicFailed;
const selectIsAddClinicSuccess = (state) => state?.clinicDomain?.isAddClinicSuccess;

const selectIsAddBookingPending = (state) => state?.clinicDomain?.isAddBookingPending;

const selectActiveClinic = (state) => state?.clinicDomain?.activeClinic;

const selectIsLoadBookingsPending = (state) => state?.clinicDomain?.isLoadBookingsPending;

export default { 
    selectClinics, 
    selectIsLoadClinicsPending,
    selectIsAddClinicPending,
    selectIsAddClinicFailed,
    selectIsAddClinicSuccess,
    selectIsAddBookingPending,
    selectIsLoadBookingsPending,
    selectActiveClinic
}
