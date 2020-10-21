const selectClinics = (state) => state?.clinicDomain?.clinics;

const selectIsLoadClinicsPending = (state) => state?.clinicDomain?.isLoadClinicsPending;

const selectIsAddClinicPending = (state) => state?.clinicDomain?.isAddClinicPending;
const selectIsAddClinicFulfilled = (state) => state?.clinicDomain?.isAddClinicFulfilled;
const selectIsAddClinicRejected = (state) => state?.clinicDomain?.isAddClinicRejected;

const selectIsAddBookingPending = (state) => state?.clinicDomain?.isAddBookingPending;

const selectActiveClinic = (state) => state?.clinicDomain?.activeClinic;

const selectIsLoadBookingsPending = (state) => state?.clinicDomain?.isLoadBookingsPending;

export default { 
    selectClinics, 
    selectIsAddClinicRejected,
    selectIsAddClinicFulfilled,
    selectIsLoadClinicsPending,
    selectIsAddClinicPending,
    selectIsAddBookingPending,
    selectIsLoadBookingsPending,
    selectActiveClinic
}
