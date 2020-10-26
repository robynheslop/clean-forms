const selectClinics = (state) => state?.clinicDomain?.clinics;

const selectIsLoadClinicsPending = (state) => state?.clinicDomain?.isLoadClinicsPending;

const selectIsAddClinicPending = (state) => state?.clinicDomain?.isAddClinicPending;
const selectIsAddClinicFailed = (state) => state?.clinicDomain?.isAddClinicFailed;
const selectIsAddClinicSuccess = (state) => state?.clinicDomain?.isAddClinicSuccess;

const selectIsAddBookingPending = (state) => state?.clinicDomain?.isAddBookingPending;
const selectIsAddBookingSuccess = (state) => state?.clinicDomain?.isAddBookingSuccess;
const selectIsAddBookingFailed = (state) => state?.clinicDomain?.isAddBookingFailed;

const selectIsSendScreeningPending = (state) => state?.clinicDomain?.isSendScreeningPending;
const selectIsSendScreeningSuccess = (state) => state?.clinicDomain?.isSendScreeningSuccess;
const selectIsSendScreeningFailed = (state) => state?.clinicDomain?.isSendScreeningFailed;

const selectActiveClinic = (state) => state?.clinicDomain?.activeClinic;

const selectIsLoadBookingsPending = (state) => state?.clinicDomain?.activeClinic?.isLoadBookingsPending;

export default { 
    selectClinics, 
    selectIsLoadClinicsPending,
    selectIsAddClinicPending,
    selectIsAddClinicFailed,
    selectIsAddClinicSuccess,
    selectIsAddBookingPending,
    selectIsAddBookingSuccess,
    selectIsAddBookingFailed,
    selectIsSendScreeningPending,
    selectIsSendScreeningSuccess,
    selectIsSendScreeningFailed,
    selectIsLoadBookingsPending,
    selectActiveClinic
}
