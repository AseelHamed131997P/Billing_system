import React, { useState } from "react";
import { Sidebar } from "../../src/ui/subComponent/component/settingsSubComp/index";
import { AccountSettings } from "../../src/ui/subComponent/component/settingsSubComp/index";
import { SecuritySettings } from "../../src/ui/subComponent/component/settingsSubComp/index";
import { PaymentMethods } from "../../src/ui/subComponent/component/settingsSubComp/index.js";
import { CompanySettings } from "../../src/ui/subComponent/component/settingsSubComp/index.js";
import { NotificationSettings } from "../../src/ui/subComponent/component/settingsSubComp/index.js";
import { Header } from "./index.js";

function Settings() {
  const [activeSection, setActiveSection] = useState("account");

  const renderContent = () => {
    switch (activeSection) {
      case "account":
        return <AccountSettings />;
      case "security":
        return <SecuritySettings />;
      case "payment":
        return <PaymentMethods />;
      case "company":
        return <CompanySettings />;
      case "notifications":
        return <NotificationSettings />;
      default:
        return <div>Section under development</div>;
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">{renderContent()}</div>
        </main>
      </div>
    </>
  );
}

export default Settings;
