const category = [
    { id: 'home', name: 'Home Page' },
    { id: 'assessment', name: 'Assessment' },
    { id: 'footer', name: 'Footer' },
    { id: 'header', name: 'Header' },
    { id: 'dashboard', name: 'Dashboard' },
    { id: 'consultation', name: 'Consultation' },
]

const pannel = [
    { id: 'user', name: 'User' },
    { id: 'counsellor', name: 'counsellor' },
    { id: 'ca', name: 'Clinic Admin' }
]

const pannelName = (id) => {
    let ext = pannel.find(itm => itm.id == id)
    return ext ? ext.name : id
}

const catName = (id) => {
    let ext = category.find(itm => itm.id == id)
    return ext ? ext.name : id
}

const keys = [
    {
        key: 'reach_out_text',
        english: 'Reach out'
    },
    {
        key: 'get_help_text',
        english: 'Get help'
    },
    { key: 'Upcoming', english: 'Upcoming' },
    { key: 'Upcoming', english: 'Upcoming' },
    { key: 'Cancelled', english: 'Cancelled' },
    { key: 'Completed', english: 'Completed' },
    { key: 'Under Approval', english: 'Can be Approve' },
    { key: 'Reschedule', english: 'Reschedule approved' },
    { key: 'Pending', english: 'Pending' },
    { key: 'Cancel Request', english: 'Pending Cancellation' },
    { key: 'No-show', english: 'No-show' },
    {
        key: 'duration_text',
        english: 'Duration'
    },
    {
        key: 'talk_now_text',
        english: "Talk Now"
    },
    {
        key: 'you_have_text',
        english: 'You have',
        pannel: ['counsellor']
    },
    {
        key: 'new_consultation__text',
        english: 'new consultation appointment. Review them to make sure it fits your schedule.',
        pannel: ['counsellor']
    },
    {
        key: 'homepage_welcome', english: 'Welcome To Naluri', cat: 'home',
    },
    {
        key: 'save_btn', english: 'Save',
        pannel: ['counsellor', 'user', 'ca']
    },
    {
        key: 'welcome_description', cat: 'home',
        english: `e-MeSVIPP is a platform to help you gain awareness of your mental wellbeing and provide you Support and resources are available to help you cope with what you are going through. We recommend you to start your mental wellness journey by doing a quick mental health check.`
    },
    {
        key: 'welcomebottom_text', cat: 'home',
        english: `if you have been here before, click here to `
    },
    {
        key: 'login_link',
        english: `Login`,
    },
    {
        key: "Let’sbegin_button", cat: 'home',
        english: `Start here`,
        pannel: ['user']
    },
    {
        key: 'home_footer', cat: 'footer',
        english: 'Know someone who might need mental or emotional support? Share this site'
    },
    {
        key: 'assessment_title', cat: 'assessment',
        english: "Naluri's Mental Health Assessment ",
        pannel: ['user']
    },
    {
        key: 'assessment_description', cat: 'assessment',
        english: "Naluri utilises the Depression, Anxiety and Stress Scale (DASS-21) to conduct the Mental Health Assessment.",
        pannel: ['user']
    },
    {
        key: 'assessment_description1', cat: 'assessment',
        english: "DASS-21 is a short standardised assessment consisting of 21 items that will help you determine your risk factors for depression, anxiety, and stress. While the assessment is an indicator of risk factors, it is not intended to diagnose any conditions. ",
        pannel: ['user']
    },
    {
        key: 'assessment_description2', cat: 'assessment',
        english: "You are encouraged to share your DASS-21 results with a mental health professional for a better understanding.",
        pannel: ['user']
    },
    {
        key: 'start_button',
        english: 'start ',
        pannel: ['user']
    },
    {
        key: 'assessment_footer', cat: 'assessment',
        english: "By continuing you agree to Naluri's Privacy Policy, Terms and Conditions. ",
        pannel: ['user']
    },
    {
        key: 'privacy_text',
        english: "Privacy Policy."
    },
    {
        key: 'termsconditions_text',
        english: "Terms and Conditions."
    },
    {
        key: 'home_menu', cat: 'header',
        english: "home "
    },
    {
        key: 'booking_menu', cat: 'header',
        english: "booking "
    },

    {
        key: 'login_menu', cat: 'header',
        english: "Login"
    },
    {
        key: 'register_menu', cat: 'header',
        english: "Register an account"
    },
    {
        key: 'profile_menu', cat: 'header',
        english: "profile "
    },
    {
        key: 'settings_menu', cat: 'header',
        english: "settings "
    },
    {
        key: 'logout_menu', cat: 'header',
        english: "logout "
    },

    {
        key: 'questions_text', cat: 'assessment',
        english: "questions",
        pannel: ['user']
    },
    {
        key: 'multiplechoice_text', cat: 'assessment',
        english: "multiple choice",
        pannel: ['user']
    },
    {
        key: 'lessthan_text', cat: 'assessment',
        english: "less than",
        pannel: ['user']
    },
    {
        key: 'min_text', cat: 'assessment',
        english: "min",
        pannel: ['user']
    },

    {
        key: 'hi_text', cat: 'dashboard',
        english: "hi"
    },
    {
        key: 'dashboard_heading', cat: 'dashboard',
        english: "Your Consultation Sessions"
    },

    {
        key: 'ic_no_heading',
        english: "IC No. or Passport No."
    },
    {
        key: 'appointmentdate_heading',
        english: "Appointment Date"
    },
    {
        key: 'phonenumber_heading',
        english: "Phone Number"
    },
    {
        key: 'status_heading',
        english: "Status"
    },
    {
        key: 'date_time_heading',
        english: "Date & Time"
    },

    // {
    //     key: 'dashboard_title', cat: 'dashboard',
    //     english: "Based on your answers, you seem to be experiencing Severe Level of depression, anxiety and stress ",
    //     pannel: ['user']
    // },

    {
        key: 'dashboard_title', cat: 'dashboard',
        english: "Based on your answers, you seem to be experiencing Severe Level of depression, anxiety and stress ",
        pannel: ['user']
    },


    {
        key: 'risk_text', cat: 'assessment',
        english: "Risk",
        pannel: ['user']
    },
    {
        key: 'dashboard_paragraph', cat: 'dashboard',
        english: "of dispression, anxiety and stress symptoms",
        pannel: ['user']
    },

    {
        key: 'dashboard_question_heading', cat: 'dashboard',
        english: "What does your result mean?",
        pannel: ['user']
    },
    {
        key: 'dashboard__answer', cat: 'dashboard',
        english: "Your results indicate that anxiety and depression symptoms may be affecting your overall well-being. If you have difficulty sleeping, notice any changes to your appetite, or are struggling to complete tasks at work or at home, we recommend seeking support from a mental health professional",
        pannel: ['user']
    },

    {
        key: 'dashboard__suggestions_hedding', cat: 'dashboard',
        english: "What would you like to do?",
        pannel: ['user']
    },

    {
        key: 'healthcare_professional_hedding', cat: 'dashboard',
        english: "Speak to your local healthcare professional",
        pannel: ['user']
    },

    {
        key: 'counsellor_ready_text', cat: 'dashboard',
        english: "Our Counsellor ready to help and support you",
        pannel: ['user']
    },

    {
        key: 'through_Whatsapp_button', cat: 'dashboard',
        english: "Reach out through Whatsapp",
        pannel: ['user']
    },

    {
        key: 'self-help_text', cat: 'dashboard',
        english: "Explore self-help tools and resources",
        pannel: ['user']
    },

    {
        key: 'stressed_out_text', cat: 'dashboard',
        english: " Signs you are too stressed out",
        pannel: ['user']
    },

    {
        key: 'unlock_positivity_text', cat: 'dashboard',
        english: "Tips to unlock positivity",
        pannel: ['user']
    },
    {
        key: 'download_result_button',
        english: "Download Result",
        pannel: ['user']
    },
    {
        key: 'dashboard_text',
        english: "Dashboard"
    },
    {
        key: 'assessments_text', cat: 'assessment',
        english: "Assessments",
        pannel: ['user']
    },
    {
        key: 'consultation_text',
        english: "Consultation Sessions"
    },
    {
        key: 'users_text',
        english: "Users"
    },
    {
        key: 'counsellors_text',
        english: "Counsellors"
    },
    {
        key: 'appointment_type',
        english: "Appointment Type"
    },
    {
        key: 'in_the_past_week', cat: 'assessment',
        english: "In the past week",
        pannel: ['user']
    },

    {
        key: 'consultation_drop',
        english: "Consultation"
    },
    {
        key: 'mode_of_consultation',
        english: "Mode of consultation"
    },
    {
        key: 'language_text',
        english: "Language"
    },
    {
        key: 'expertise_text',
        english: "Expertise"
    },
    {
        key: 'country_text',
        english: "Country"
    },

    {
        key: 'state_text',
        english: "State"
    },

    {
        key: 'city_text',
        english: "City"
    },

    {
        key: 'time_zone_text',
        english: "Time Zone"
    },

    {
        key: 'appointment_type_text',
        english: "Appointment Type"
    },
    {
        key: 'clear_text',
        english: "Clear"
    },
    {
        key: 'details_text',
        english: "Details"
    },
    {
        key: 'first_name',
        english: "First Name"
    },
    {
        key: 'last_name',
        english: "Last Name"
    },
    {
        key: 'email_text',
        english: "Email"
    },
    {
        key: 'role_text',
        english: "Role"
    },
    {
        key: 'icnumber_text',
        english: "IC Number"
    },
    {
        key: 'mobileno_text',
        english: "Mobile No"
    },
    {
        key: 'timezone',
        english: "Time Zone"
    },
    {
        key: 'nationality_text',
        english: "nationality"
    },
    {
        key: 'gender_text',
        english: "Gender"
    },
    {
        key: 'date_of_birth',
        english: "Date of Birth"
    },
    {
        key: 'male_text',
        english: "Male"
    },
    {
        key: 'female_text',
        english: " Female"
    },
    {
        key: 'currrent_password',
        english: " Currrent Password"
    },
    {
        key: 'new_password',
        english: " New Password"
    },
    {
        key: 'confirm_password',
        english: "Confirm Password"
    },

    {
        key: 'settings_text',
        english: "Settings"
    },


    {
        key: 'preference_text',
        english: "Preference"
    },

    {
        key: 'attend_text', cat: 'dashboard',
        english: "Attend",
        pannel: ['counsellor', 'ca']
    },

    {
        key: 'calendar_view_text', cat: 'dashboard',
        english: "Calendar View"
    },


    {
        key: 'manage_appointment_text', cat: 'consultation',
        english: " Manage Appointment"
    },

    {
        key: 'view_profile_text',
        english: "View Profile"
    },


    {
        key: 'added_by_text',
        english: "Added By"
    },
    {
        key: 'note_text',
        english: "Note"
    },
    {
        key: 'date_text',
        english: "Date"
    },

    {
        key: 'view_case_note',
        english: "View Case Note",
        pannel: ['counsellor']
    },

    {
        key: 'name_text',
        english: "Name"
    },

    {
        key: 'action_text',
        english: "Action"
    },

    {
        key: 'case_note_text',
        english: "Case Note",
        pannel: ['counsellor']
    },


    {
        key: 'add_consultation_sessions', cat: 'consultation',
        english: "Add Consultation Sessions",
        pannel: ['counsellor', 'ca']
    },
    {
        key: 'send_consultation_sessions_link', cat: 'consultation',
        english: "Add Consultation Sessions",
        pannel: ['counsellor', 'ca']
    },
    {
        key: 'availability_text', cat: 'consultation',
        english: "Availability",
        pannel: ['counsellor', 'ca']
    },

    {
        key: 'cancellation_requests_text', cat: 'consultation',
        english: "Cancellation Requests",
        pannel: ['ca']
    },
    {
        key: 'all_users_text',
        english: "All Users",
        pannel: ['counsellor', 'ca']
    },
    {
        key: 'health_clinic_text', cat: 'consultation',
        english: "Health Clinic"
    },
    {
        key: 'clinic_admin_text', cat: 'consultation',
        english: "Clinic Admin",
        pannel: ['counsellor']
    },
    {
        key: 'clinic_name', cat: 'consultation',
        english: "Clinic Name"
    },
    {
        key: 'reschedule_time_text', cat: 'consultation',
        english: "Reschedule Time"
    },
    {
        key: 'languages_text', cat: 'consultation',
        english: "Languages"
    },

    {
        key: 'add_expertise_text', cat: 'consultation',
        english: "Add Expertise",
        pannel: ['counsellor']
    },

    {
        key: 'add_languages_text', cat: 'consultation',
        english: "Add Languages",
        pannel: ['counsellor']
    },


    {
        key: 'homepage_hedding', cat: 'home',
        english: "How is Your Mental Health?"
    },
    {
        key: 'homepage_paira', cat: 'home',
        english: "Find out more about your mental health, and access resources to manage and maintain your mental wellness."
    },

    {
        key: 'startassessment_btn', cat: 'home',
        english: "Start Assessment",
        pannel: ['user']
    },
    {
        key: 'self_equipped', cat: 'home',
        english: "Maintain Your Mental Well-being",
    },

    {
        key: 'self_equipped_paira', cat: 'home',
        english: "Here are practical guides, tips, and best practices to help you maintain your well-being through self-paced lessons, articles, and webinars."
    },

    {
        key: 'homequestion', cat: 'home',
        english: "What is the difference between depression, anxiety and stress"
    },

    {
        key: 'homequestion_two', cat: 'home',
        english: "  What should I do if I don't feel safe at home?"
    },
    {
        key: 'explore_library', cat: 'home',
        english: "Explore library"
    },
    {
        key: 'talk_to_professionals', cat: 'home',
        english: "Talk to Our Care Providers"
    },

    {
        key: 'professionals_paira', cat: 'home',
        english: "Schedule a therapy session or access our 24/7 chat with our licensed counsellors"
    },

    {
        key: 'professionals_paira_two', cat: 'home',
        english: "Complete assessment to get help"
    },

    {
        key: 'consultation_type', cat: 'consultation',
        english: "Consultation Type"
    },

    {
        key: 'clinic_address', cat: 'consultation',
        english: "Clinic Address"
    },
    {
        key: 'result_text', cat: 'assessment',
        english: "Result",
        pannel: ['user']
    },

    {
        key: 'type_text',
        english: "Type"
    },

    {
        key: 'retake_assessment', cat: 'assessment',
        english: "Retake Assessment",
        pannel: ['user']
    },

    {
        key: 'userdashboard_text', cat: 'dashboard',
        english: "Based on your answers, you seem to be experiencing Severe Levels of depression,anxiety and stress",
        pannel: ['user']
    },

    {
        key: 'userdashboard_text', cat: 'dashboard',
        english: "Based on your answers, you seem",
        pannel: ['user']
    },

    {
        key: 'userdashboard_text_one', cat: 'dashboard',
        english: "to be experiencing",
        pannel: ['user']
    },

    {
        key: 'levels_text', cat: 'dashboard',
        english: "Levels",
        pannel: ['user']
    },

    {
        key: 'of_depression,', cat: 'dashboard',
        english: "of depression",
        pannel: ['user']
    },


    {
        key: 'anxiety_and_stress', cat: 'dashboard',
        english: "anxiety and stress,",
        pannel: ['user']
    },

    {
        key: 'dash_rulttext', cat: 'dashboard',
        english: "What Do Your Results Mean?",
        pannel: ['user']
    },

    {
        key: 'low_text', cat: 'assessment',
        english: "Low",
        pannel: ['user']
    },
    {
        key: 'depression_text', cat: 'assessment',
        english: "Depression",
        pannel: ['user']
    },

    {
        key: 'anxiety_text', cat: 'assessment',
        english: "Anxiety",
        pannel: ['user']
    },

    {
        key: 'stress_text', cat: 'assessment',
        english: "Stress",
        pannel: ['user']
    },

    {
        key: 'normal_text', cat: 'assessment',
        english: "Normal",
        pannel: ['user']
    },


    {
        key: 'normal_result', cat: 'assessment',
        english: "Your results indicate that negative emotional states are likely not affecting your overall well-being. However, if you have difficulty sleeping, notice any changes to your appetite, or are struggling to complete tasks at work or at home, we recommend seeking support from a mental health professional.",
        pannel: ['user']
    },

    {
        key: 'mild_result', cat: 'assessment',
        english: "Your results indicate that anxiety and depression symptoms may be affecting your overall well-being. If you have difficulty sleeping, notice any changes to your appetite, or are struggling to complete tasks at work or at home, we recommend seeking support from a mental health professional",
        pannel: ['user']
    },

    {
        key: 'severe_result', cat: 'assessment',
        english: "Your results indicate that anxiety, depression and stress symptoms are affecting your overall well-being, and you would benefit from consulting a psychologist or counsellor through a one-on-one consultation through Whatsapp, where they will be able to advise you on how to navigate these challenges.",
        pannel: ['user']
    },

    {
        key: 'save_your_result', cat: 'assessment',
        english: "Save Result",
        pannel: ['user']
    },
    {
        key: 'Severe_text', cat: 'assessment',
        english: "Severe",
        pannel: ['user']
    },

    {
        key: 'mild_text', cat: 'assessment',
        english: "Mild",
        pannel: ['user']
    },

    {
        key: 'consultation_text', cat: 'consultation',
        english: "Consultation"
    },

    {
        key: 'resources_text', cat: 'header',
        english: "Resources"
    },

    {
        key: 'about_us_text', cat: 'header',
        english: "About us"
    },
    {
        key: 'faq_text', cat: 'header',
        english: "FAQ"
    },

    {
        key: 'consultation_session',
        english: "Consultation Session"
    },
    {
        key: 'consultation_para', cat: 'consultation',
        english: "Choose a date and time that fit your schedule to get started or search your previous counsellor"
    },
    {
        key: 'filters_text',
        english: "Filters"
    },
    {
        key: 'select_date_text',
        english: "Select Date"
    },
    {
        key: 'choose_time',
        english: "Choose Time"
    },
    {
        key: 'consultation_preference', cat: 'consultation',
        english: "Consultation Preference"
    },
    {
        key: 'search_text',
        english: "Search"
    },
    {
        key: 'filter_text',
        english: "Filter"
    },


    {
        key: 'search_counsellor',
        english: "Search Counsellor"
    },

    {
        key: 'counsellor_name',
        english: "Counsellor name"
    },

    {
        key: 'video_consultation', cat: 'consultation',
        english: "Video Consultation"
    },

    {
        key: 'in-person_consultation', cat: 'consultation',
        english: "In-person Consultation"
    },
    {
        key: 'select_country',
        english: "Select Country"
    },
    {
        key: 'select_state',
        english: "Select State"
    },

    {
        key: 'select_city',
        english: "Select City"
    },


    {
        key: 'select_language',
        english: "Select Language"
    },

    {
        key: 'select_expertise', cat: 'consultation',
        english: "Select Expertise"
    },

    {
        key: 'select_time_zone', cat: 'consultation',
        english: "Select Time Zone"
    },


    {
        key: 'select_appointment_type', cat: 'consultation',
        english: "Select Appointment Type"
    },

    {
        key: 'clear_all',
        english: "Clear all"
    },

    {
        key: 'show_button',
        english: "Show"
    },

    {
        key: 'time_slot', cat: 'consultation',
        english: "Time Slot"
    },

    {
        key: 'time_zone_text', cat: 'consultation',
        english: "Time Zone"
    },


    {
        key: 'accreditations&membership', cat: 'consultation',
        english: "Accreditations & Membership"
    },

    {
        key: 'aspecialises_in', cat: 'consultation',
        english: "specialises in Addication, Anger Management"
    },

    {
        key: 'location_text', cat: 'consultation',
        english: "location"
    },

    {
        key: 'time_text', cat: 'consultation',
        english: "Time"
    },

    {
        key: 'not_available', cat: 'consultation',
        english: "Not available"
    },

    {
        key: 'confirm_booking', cat: 'consultation',
        english: "Confirm booking"
    },


    {
        key: 'booking_confirm_title', cat: 'consultation',
        english: "Are you sure you able to attend to the consultation?"
    },


    {
        key: 'booking_confirm_detail', cat: 'consultation',
        english: "If you can’t attend to the location, you can change the consultation to whatsapp video consultation instead."
    },

    {
        key: 'yes_text',
        english: "Yes"
    },
    {
        key: 'no_text',
        english: "No"
    },

    {
        key: 'personal_details',
        english: "Personal Details"
    },

    {
        key: 'Back_text',
        english: "Back"
    },

    {
        key: 'home_address', cat: 'consultation',
        english: "Home Address"
    },

    {
        key: 'emergency_contact', cat: 'consultation',
        english: "Emergency Contact"
    },

    {
        key: 'topic_of_discussion', cat: 'consultation',
        english: "Topic of Discussion"
    },

    {
        key: 'consultation_service_consent_form', cat: 'consultation',
        english: "Consultation Service Consent Form"
    },
    {
        key: 'full_name',
        english: "Full Name"
    },

    {
        key: 'street_address',
        english: "Street address"
    },

    {
        key: 'zipcode_text',
        english: "Zipcode"
    },

    {
        key: 'guardian_name', cat: 'consultation',
        english: "Guardian Name"
    },
    {
        key: 'guardian_relationship', cat: 'consultation',
        english: "Guardian Relationship"
    },
    {
        key: 'emergency_contact_check', cat: 'consultation',
        english: " I confirm that the details provided are accurate and I provide Ministry of Health Malaysia with permission to contact the emergency contact person should Ministry of Health Malaysia perceive the need to do so in case of emergency, crisis or any relevant circumstances. *"
    },

    {
        key: 'main_concern_to_talk_about', cat: 'consultation',
        english: "Main concern to talk about"
    },
    {
        key: 'consultation_service_paira', cat: 'consultation',
        english: "Kindly be informed that you would have to read through the consultation consent form and provide your personal details to book a session. The purpose of the form is to provide you with the important principles in our services so that you will proceed based on accurate, informed expectations. To read details on the consultation consent,"
    },

    {
        key: 'consultation_service_check_one', cat: 'consultation',
        english: "I acknowledge that I have read and agree to the clauses stated in the consent form for the duration of the relationship with my consultant, including any additional sessions I may have."
    },

    {
        key: 'consultation_service_check_two', cat: 'consultation',
        english: "In submitting this form I give consent to Ministry of Health Malaysia to store, process and analyse my personal information and case notes. I understand that this information will only be accessed by necessary staff, my data will be held securely and will not be distributed to third parties."
    },

    {
        key: 'consultation_booking_summary', cat: 'consultation',
        english: "Consultation Booking Summary"
    },

    {
        key: 'title_text',
        english: "title"
    },

    {
        key: 'when_text', cat: 'consultation',
        english: "When"
    },


    {
        key: 'change_date&time',
        english: "Change Date & time"
    },


    {
        key: 'book_appointment', cat: 'consultation',
        english: "Book Appointment"
    },

    {
        key: 'consultation_booking_successfully', cat: 'consultation',
        english: "Consultation Booking Successfully"
    },

    {
        key: 'back_home', cat: 'consultation',
        english: "Back Home"
    },

    {
        key: 'consultation_appointment_with', cat: 'consultation',
        english: "Consultation Appointment with"
    },

    {
        key: 'back_button',
        english: "Back"
    },

    {
        key: 'counsellor_newtext',
        english: "Counsellor"
    },

    {
        key: 'level_newtext',
        english: "Level"
    },

    {
        key: 'add_appointment_type', cat: 'consultation',
        english: "Add Appointment Type"
    },

    {
        key: 'actions_text',
        english: "Actions"
    },

    {
        key: 'all_counsellors',
        english: "All Counsellors"
    },

    {
        key: 'invite_counsellor_button',
        english: "Invite Counsellor"
    },

    {
        key: 'audit_trail_text',
        english: "Audit Trail",
        pannel: ['counsellor', 'ca']
    },

    {
        key: 'updated_at',
        english: "Updated At"
    },
    {
        key: 'updated_text',
        english: "Updated Text"
    },

    {
        key: 'close_btutton',
        english: "Close"
    },

    {
        key: 'send_btutton',
        english: "Send"
    },

    {
        key: 'add_text',
        english: "Add"
    },
    {
        key: 'time_text',
        english: "Time"
    },

    {
        key: 'select_option',
        english: "Select Option"
    },

    {
        key: 'edit_profile',
        english: "Edit Profile"
    },
    {
        key: 'change_password',
        english: " Change Password"
    },
    {
        key: 'my_users_text',
        english: "My Users",
        pannel: ['counsellor', 'ca']
    },
    {
        key: 'appointment_proposal', cat: 'consultation',
        english: "Appointment Proposal",
        pannel: ['ca']
    },
    {
        key: 'reschedule_requests', cat: 'consultation',
        english: "Reschedule Requests"
    },
    {
        key: 'view_consultation_session', cat: 'consultation',
        english: "View Consultation Session"
    },
    {
        key: 'appointment_detail', cat: 'consultation',
        english: "Appointment Detail"
    },
    {
        key: 'appointment_time', cat: 'consultation',
        english: "Appointment Time"
    },

    {
        key: 'added_case_note', cat: 'consultation',
        english: "Added Case Note",
        pannel: ['counsellor']
    },
    {
        key: 'did_the_user_attend_the_session', cat: 'consultation',
        english: "Did the user attend the session?",
        pannel: ['counsellor', 'ca']
    },
    {
        key: 'user_name', cat: 'consultation',
        english: "User Name"
    },

    {
        key: "counsellor's_Name", cat: 'consultation',
        english: "Counsellor's Name"
    },
    {
        key: "counsellor's_phone_number", cat: 'consultation',
        english: "Counsellor's Phone Number"
    },

    {
        key: "cancel_button",
        english: "Cancel"
    },

    {
        key: "view_intake_form", cat: 'consultation',
        english: "View Intake form"
    },

    {
        key: "add_consultation_sessions", cat: 'consultation',
        english: "Add Consultation Sessions"
    },
    {
        key: "add_text",
        english: "Add"
    },
    {
        key: "user_text",
        english: "User"
    },

    {
        key: "case_notes", cat: 'consultation',
        english: "Case Notes",
        pannel: ['counsellor', 'ca']
    },

    {
        key: "overall_result", cat: 'assessment',
        english: "Overall Result",
        pannel: ['user']
    },
    {
        key: "depression_score", cat: 'assessment',
        english: "Depression Score",
        pannel: ['user']
    },

    {
        key: "anxiety_score", cat: 'assessment',
        english: "Anxiety Score",
        pannel: ['user']
    },

    {
        key: "view_note", cat: 'consultation',
        english: "View Note",
        pannel: ['user']
    },
    {
        key: "previous_consultation", cat: 'consultation',
        english: "Previous Consultation"
    },

    {
        key: "upcoming_consultation", cat: 'consultation',
        english: "Upcoming Consultation"
    },

    {
        key: "assessment_text",
        english: "Assessment",
        pannel: ['user']
    },


    {
        key: "profile_details",
        english: "Profile Details"
    },

    {
        key: "healthclinic_text", cat: 'consultation',
        english: "healthclinic"
    },

    {
        key: "edit_counsellor", cat: 'consultation',
        english: "Edit Counsellor",
        pannel: ['ca']
    },

    {
        key: 'add_appointment_type', cat: 'consultation',
        english: " Add Appointment Type",
        pannel: ['ca']
    },

    {
        key: "counsellor's_availability", cat: 'consultation',
        english: "Counsellor's Availability",
    },
    {
        key: "recent_result", cat: 'consultation',
        english: "Recent Result",
        pannel: ['user']
    },

    {
        key: "6_tips_to_cope_with_anxiety", cat: 'dashboard',
        english: "6 tips to cope with anxiety",
        pannel: ['user']
    },

    {
        key: "sings_you_are_too_stressed_out", cat: 'dashboard',
        english: "Sings you are too stressed out",
        pannel: ['user']
    },
    {
        key: "tips_to_unlock_positivity", cat: 'dashboard',
        english: "Tips to unlock positivity",
        pannel: ['user']
    },
    {
        key: "family_text", cat: 'dashboard',
        english: "Family",
        pannel: ['user']
    },

    {
        key: "issue_text", cat: 'dashboard',
        english: "Issue",
        pannel: ['user']
    },

    {
        key: "financial_text", cat: 'dashboard',
        english: "Financial",
        pannel: ['user']
    },

    {
        key: "stress_text", cat: 'assessment',
        english: "Stress",
        pannel: ['user']
    },
    {
        key: "Work_text", cat: 'dashboard',
        english: "Work",
        pannel: ['user']
    },

    {
        key: "here_are_some_resources_to_promote_your_mental_wellbeing", cat: 'dashboard',
        english: "Here are some resources to promote your mental wellbeing",
        pannel: ['user']
    },


    {
        key: "past_results", cat: 'dashboard',
        english: "Past Results",
        pannel: ['user']
    },


    {
        key: "extremely_severe", cat: 'assessment',
        english: "Extremely severe",
        pannel: ['user']
    },

    {
        key: "high_text", cat: 'assessment',
        english: "High",
        pannel: ['user']
    },

    {
        key: "view_assessment", cat: 'assessment',
        english: "View Assessment",
        pannel: ['user']
    },

    {
        key: "text_over_the_last_two_weeks", cat: 'assessment',
        english: "Over the last 2 weeks, how often have you been bothered by the following problems?",
        pannel: ['user']
    },

    {
        key: "items_text", cat: 'assessment',
        english: "Items",
        pannel: ['user']
    },

    {
        key: "answers_text", cat: 'assessment',
        english: "Answers",
        pannel: ['user']
    },

    {
        key: "scores_text", cat: 'assessment',
        english: "Scores",
        pannel: ['user']
    },

    {
        key: "appointment_reminder",
        english: "Appointment Reminder",
        pannel: ['ca']
    },

    {
        key: "add_appointment_reminder",
        english: "Add Appointment Reminder",
        pannel: ['ca']
    },
    {
        key: "health_text", cat: 'dashboard',
        english: "Health"
    },

    {
        key: "update_button",
        english: "Update"
    },


    {
        key: "consultation_preference", cat: 'consultation',
        english: "Consultation Preference"
    },

    {
        key: "each_session_is", cat: 'consultation',
        english: "Each session is"
    },


    {
        key: "minute_consultation", cat: 'consultation',
        english: "minute consultation"
    },

    {
        key: "question_text", cat: 'assessment',
        english: "Question"
    },

    {
        key: "there_are_no_questions_for", cat: 'assessment',
        english: "There are no questions for",
        pannel: ['user']
    },

    {
        key: "already_have_an_account",
        english: "Already have an account"
    },
    {
        key: "login_an_account_to_view_your_result",
        english: "Login an account to view your result"
    },

    {
        key: "privacy_policy_text",
        english: "Please accept privacy policy and terms and conditions"
    },


    {
        key: "not_matched",
        english: "Comfirm Password is not matched with New Password"
    },
    {
        key: "non-malaysian",
        english: "Non-Malaysian"
    },

    {
        key: "all_text",
        english: "All"
    },

    {
        key: "in-personConsultation", cat: 'consultation',
        english: " In-person Consultation"
    },

    {
        key: "login_text",
        english: "Login"
    },

    {
        key: "not_account",
        english: "Do not have an account?"
    },
    {
        key: "create_account",
        english: "Create an account here"
    },
    {
        key: 'mobile_number',
        english: "Mobile Number"
    },

    {
        key: 'email_address',
        english: "Email Address"
    },

    {
        key: 'password_text',
        english: "Password"
    },
    {
        key: 'fgorgot_password',
        english: "Forgot Password"
    },

    {
        key: 'forgot_placeholder',
        english: "IC Number / Passport Number / Email"
    },

    {
        key: 'reset_password',
        english: "Reset Password"
    },

    {
        key: 'code_text',
        english: "Code"
    },
    {
        key: 'min_length_validation',
        english: "Min Length must be 8 characters long"
    },
    {
        key: 'submit_button',
        english: "Submit"
    },


    {
        key: 'institute_text',
        english: "Institute"
    },

    {
        key: 'degree_text',
        english: "Degree"
    },

    {
        key: 'invalid_country_code',
        english: "invalid country code"
    },

    {
        key: 'min_length_text',
        english: "Min Length"
    },

    {
        key: 'invalid_email',
        english: "invalid Email"
    },
    {
        key: "consultation_sessions", cat: 'consultation',
        english: "Consultation Sessions"
    },
    {
        key: "upcoming_text", cat: 'consultation',
        english: "Upcoming_text"
    },

    {
        key: 'add_availability', cat: 'consultation',
        english: "Add Availability"
    },

    {
        key: 'schedule_date', cat: 'consultation',
        english: "Schedule Date"
    },

    {
        key: 'end_text',
        english: "End Time"
    },

    {
        key: 'select_mode_of_consultation', cat: 'consultation',
        english: "Select Mode of Consultation"
    },

    {
        key: 'start_time',
        english: "Start Time"
    },
    {
        key: 'end_time',
        english: "End Time"
    },

    {
        key: 'view_availability', cat: 'consultation',
        english: "View Availability"
    },
    {
        key: 'edit_text',
        english: "Edit"
    },

    {
        key: 'add_user',
        english: "Add User"
    },

    {
        key: 'new_case_note', cat: 'consultation',
        english: "New Case Note"
    },
    {
        key: 'counsellor_detail', cat: 'consultation',
        english: "Counsellor Detail"
    },

    {
        key: 'user_detail',
        english: "User Detail"
    },

    {
        key: 'hours_of_consultations', cat: 'consultation',
        english: "Hours Of Consultations"
    },

    {
        key: 'case_type', cat: 'consultation',
        english: "Case Type"
    },
    {
        key: 'severity_level', cat: 'consultation',
        english: "Severity Level"
    },

    {
        key: 'client_status', cat: 'consultation',
        english: "Client Status"
    },

    {
        key: 'support_letter', cat: 'consultation',
        english: "Support Letter"
    },

    {
        key: 'notes_text',
        english: "Notes"
    },

    {
        key: 'file_text',
        english: "File"
    },

    {
        key: 'in_draft',
        english: "In Draft"
    },
    {
        key: 'clinical_text',
        english: "Clinical"
    },

    {
        key: 'non-clinical',
        english: "Non-clinical"
    },
    {
        key: 'high_text',
        english: "High"
    },

    {
        key: 'medium_text',
        english: "Medium"
    },

    {
        key: 'Have_you_provided', cat: 'consultation',
        english: "Have you provided any support letter or referral letter to the member?"
    },

    {
        key: 'upload_the_document_for_keeping', cat: 'consultation',
        english: "Upload the document for keeping"
    },

    {
        key: 'add_case_note', cat: 'consultation',
        english: "Add Case Note",
        pannel: ['counsellor']
    },

    {
        key: 'pdf_header', cat: 'assessment',
        english: "Depression and Anxiety Stress Scale 21 Assessment Result",
        pannel: ['user']
    },

    {
        key: 'pdf_profile_section',
        english: "Profile Details"
    },

    {
        key: 'pdf_result',
        english: "Results",
        pannel: ['user']
    },

    {
        key: 'special_character_password',
        english: "Input Password and Submit [8 to 20 characters which contain at least one numeric digit, one uppercase, one lowercase letter and  a special character",
    },
    {
        key: 'reschedule_button', cat: 'consultation',
        english: "Reschedule"
    },
    {
        key: 'message_text', cat: 'consultation',
        english: "Message"
    },

    {
        key: 'please_contact', cat: 'consultation',
        english: "Please contact to clinic Admin.Email is"
    },
    {
        key: 'reschedule_text', cat: 'consultation',
        english: "Reschedule"
    },

    {
        key: 'do_you_want', cat: 'consultation',
        english: "Do you want to reschedule with other counsellor"
    },

    {
        key: 'pdf_overall_risk',
        english: "Overall Risk",
        pannel: ['user']
    },
    {
        key: 'pdf_static_text', cat: 'assessment',
        english: "Your results indicate that anxiety and depression symptoms may be affecting",
        pannel: ['user']
    },

    {
        key: 'of_dispression_anxiety_and_stress_symptoms', cat: 'assessment',
        english: "of dispression, anxiety and stress symptoms",
        pannel: ['user']
    },
    {
        key: 'no_data',
        english: "No Data"
    },
    {
        key: 'view_appointment', cat: 'consultation',
        english: "View Appointment"
    },

    {
        key: 'edit_Calendar', cat: 'consultation',
        english: "Edit Calendar"
    },

    {
        key: 'booking_cancellation', cat: 'consultation',
        english: "Booking Cancellation"
    },

    {
        key: 'booking_detail', cat: 'consultation',
        english: "Booking Detail"
    },

    {
        key: 'why_you_want_to_cancel', cat: 'consultation',
        english: "Why you want to cancel"
    },

    {
        key: 'cancellation_policy', cat: 'consultation',
        english: " I agree the cancellation policy"
    },
    {
        key: 'cancellation_confirm', cat: 'consultation',
        english: "Cancellation Confirm"
    },

    {
        key: 'reason_text', cat: 'consultation',
        english: "Reason"
    },

    {
        key: 'availabile_date', cat: 'consultation',
        english: "Availabile Date"
    },


    {
        key: 'book_text', cat: 'consultation',
        english: "Book"
    },
    {
        key: 'send_consultation_sessions_link', cat: 'consultation',
        english: "Send Consultation Sessions Link",
        pannel: ['counsellor', 'ca']
    },

    {
        key: 'select_user', cat: 'consultation',
        english: "Select User",
        pannel: ['counsellor', 'ca']
    },

    {
        key: 'mark_as_complete', cat: 'consultation',
        english: "Mark as Complete",
        pannel: ['counsellor', 'ca']
    },
    {
        key: 'edit_text', cat: 'consultation',
        english: "Edit"
    },
    {
        key: 'reschedule_booking', cat: 'consultation',
        english: "Reschedule Booking"
    },
    {
        key: 'our_counselor_ready_text', cat: 'consultation',
        english: 'Our counselor ready to help and support you'
    },
    {
        key: 'depression_anxiety&stress', cat: 'assessment',
        english: "Depression, Anxiety & Stress",
        pannel: ['user']
    },
    {
        key: 'domestic_violence', cat: 'home',
        english: "Domestic Violence"
    },

    {
        key: "signup_account",
        english: "Create An Account"
    },
    {
        key: "min_length9",
        english: "Min Length is 9"
    },

    {
        key: "min_length6",
        english: "Min Length is 6"
    },

    {
        key: "already_have_an_account?",
        english: "Already have an account?"
    },

    {
        key: "log_in_here",
        english: "Log in here"
    },

    {
        key: "privacy_policy",
        english: "By continuing you agree to Term & Condition and Privacy Policy"
    },

    {
        key: 'register_text',
        english: "Register"
    },

    {
        key: 'less_than',
        english: "Less than"
    },

    {
        key: 'mins',
        english: "mins_text"
    },

    {
        key: 'receive_suggestions',
        english: "Receive",
        cat: 'home'
    },

    {
        key: 'suggestions_text',
        english: "suggestions"
    },

    {
        key: 'retake_anytime',
        english: "Retake anytime",
        cat: 'home'
    },
    {
        key: 'save_and_share',
        english: "Save and share",
        cat: 'home'
    },
    {
        key: 'change_counsellor',
        english: "Change Counsellor"
    },
    {
        key: 'case_note_detail',
        english: "Case Note Detail",
        pannel: ['counsellor', 'ca']
    },
    {
        key: 'view_request',
        english: "View Request"
    },
    {
        key: 'slot_text',
        english: "Slot"
    },
    {
        key: 'zoom_link',
        english: "Zoom Link"
    },
    {
        key: 'day_availability',
        english: "Day Availability"
    },

    {
        key: 'week_availability',
        english: "Week Availability"
    },

    {
        key: 'institution_text',
        english: "Institution"
    },
    {
        key: 'contact_us',
        english: "Contact Us"
    },
    {
        key: 'financial_stress',
        english: "Financial Stress"
    },

    {
        key: 'physical_text',
        english: "Physical "
    },

    {
        key: 'day_text',
        english: "Day"
    },

    {
        key: 'ic_number',
        english: "IC Number/Passport Number"
    },
    {
        key: "Updating_button",
        english: "Updating"
    },

    {
        key: "answer_these_questions",
        english: "Let's answer these questions to understand how you've been doing"
    },

    {
        key: 'take_assessment',
        english: "Take Assessment"
    },

    {
        key: 'Other_assessments',
        english: "Other Assessments"
    },

    {
        key: 'phq-9_assessment',
        english: "PHQ-9 Assessment"
    },


    {
        key: 'gad-7_assessment',
        english: "GAD-7 Assessment"
    },

    {
        key: 'seem_experiencing',
        english: "You seem to be experiencing"
    },

    {
        key: 'blogs_text',
        english: "blogs"
    },

    {
        key: 'related_articles',
        english: "Related Articles"
    },

    {
        key: 'next_text',
        english: "Next"
    },

    {
        key: 'malay_description',
        english: "(GAD) Malay description Of GAD"
    },

    {
        key: 'during_weeks',
        english: "During the past 2 weeks..."
    },

    {
        key: 'view_question',
        english: "View Question"
    },

    {
        key: 'options_text',
        english: "Options"
    },

    {
        key: 'Weightage_text',
        english: "Weightage"
    },

    {
        key: 'reminder_text',
        english: "Reminder"
    },

    {
        key: 'Create_text',
        english: "Create"
    },

    {
        key: "hours_text",
        english: "Hours"
    },
    {
        key: 'set_date_time',
        english: "Set Date & Time"
    },
    {
        key: 'set_text',
        english: "Set"
    },
    {
        key: 'date_text',
        english: "Date"
    },

    {
        key: 'select_counsellor',
        english: "Select Counsellor"
    },
    {
        key: 'add_my_user',
        english: "Add To My User"
    },

    {
        key: 'user_added',
        english: "User Added"
    },
    {
        key: 'add_columns',
        english: "Add Columns"
    },

    {
        key: 'added_on',
        english: "Added on"
    },

    {
        key: 'updated_by',
        english: "Updated by"
    },

    {
        key: 'Mode_counselling_session',
        english: "Mode of counselling session"
    },
    {
        key: 'create_an_result',
        english: "Create an account to view your result"
    },
    {
        key: 'to_save_download',
        english: "To save and download your results, an account is needed"
    },
    {
        key: 'create_an_account',
        english: "Create an ccount?"
    },
    {
        key: 'comfirm_password',
        english: "Comfirm Password"
    },
    {
        key: 'to_save_and_download',
        english: "To save and download your results, an account is needed."
    },
    {
        key: "create_account_account",
        english: "Create an account?"
    },
    {
        key: "register_here",
        english: "Register here"
    },
    {
        key: "i_agree_to_the",
        english: "I agree to the"
    },

    {
        key: 'book_consultation',
        english: " Book Consultation"
    },

]

const translationModel = { keys, category, catName, pannel, pannelName }
export default translationModel