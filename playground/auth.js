(function() {
  function staticConfigurations() {
    window.encounterTemplateV2User = {
      DoctorCompanyId: 17821,
      AppLoginTokens: [
        {
          Token:
            "178,238,242,138,215,45,54,78,29,77,111,91,104,76,249,136,11,70,14,19,7,115,116,145,164,188,104,150,171,65,234,60,120,158,4,21,228,82,169,100,31,79,93,156,28,140,0,210,103,242,192,64,119,180,85,92,240,162,67,46,230,147,21,110,6,120,92,145,178,242,241,131,70,231,251,169,18,149,205,25,252,112,120,102,141,71,23,35,200,156,153,186,231,212,10,15,79,168,47,76,19,151,252,134,56,176,124,158,41,33,204,213,50,208,86,185,72,90,105,247,137,69,243,118,72,154,73,70",
        },
      ],
      AppLoginInfoes: [
        {
          Signature: null,
        },
      ],
    };

    window.encounterTemplateV2EncounterInfo = {
      PatientId: 40904933,
      DoctorId: 76535,
      EncounterId: 0,
      EncounterType: null,
      CopyEncounterId: 0,
      LoggedInUserId: 76535,
      DoctorGroupId: 18462,
      IsNewEncounter: true,
      EncounterVersion: "v2.0",
      IsModalPopup: false,
      HasEnabledPatientDashboardV2Page: true,
      IsPreviewEditMode: false,
      SelectedFormId: 0,
      SelectedFormName: null,
    };

    window.encounterTemplateV2PageTitle = {
      PageTitle: "Add Encounter - Mr. Internal 3Staff Test",
    };
  }

  function authenticate() {
    fetch(
      "/EHRV8AuthenticateAPIServices/ehrv8/authentication/AuthenticateUser",
      {
        method: "POST",
        headers: {
          RequestInfo: "TestUser#TestPass###",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserName: "internaldev",
          Password: "Apex@007",
        }),
      }
    )
      .then(resp => resp.json())
      .then(auth => {
        window.encounterTemplateV2User = auth.Login;
      });
  }

  staticConfigurations();
  authenticate();
})();
