"use client";

import {
  Bell,
  AlertTriangle,
  PawPrint,
  Heart,
  UserX,
  CalendarCheck,
} from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="space-y-10 w-full">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
        <p className="text-gray-500 text-sm">
          All updates related to reports, bookings, adoptions, and account
          activities.
        </p>
      </div>

      {/* TODAY SECTION */}
      <SectionLabel text="Today" />

      <div className="space-y-4">
        <NotificationCard
          icon={<CalendarCheck className="h-6 w-6 text-[#00A7C7]" />}
          title="New Service Booking"
          description="A user has booked a grooming service for their pet Luna."
          time="5 minutes ago"
        />

        <NotificationCard
          icon={<Heart className="h-6 w-6 text-[#00A7C7]" />}
          title="New Adoption Request"
          description="Alex submitted an adoption request for pet Bella."
          time="20 minutes ago"
        />
      </div>

      {/* THIS WEEK SECTION */}
      <SectionLabel text="This Week" />

      <div className="space-y-4">
        <NotificationCard
          icon={<AlertTriangle className="h-6 w-6 text-[#00A7C7]" />}
          title="Post Reported"
          description="A post by user @mark89 has been reported for inappropriate content."
          time="2 days ago"
        />

        <NotificationCard
          icon={<UserX className="h-6 w-6 text-[#00A7C7]" />}
          title="User Account Deleted"
          description="User Sarah requested for account deletion. The account has been removed."
          time="4 days ago"
        />
      </div>
    </div>
  );
}

/* ------------------ SECTION LABEL ------------------ */
function SectionLabel({ text }: { text: string }) {
  return (
    <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-1">
      {text}
    </h2>
  );
}

/* ------------------ NOTIFICATION CARD ------------------ */
function NotificationCard({
  icon,
  title,
  description,
  time,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-start gap-4">
      {/* Icon circle */}
      <div className="p-3 bg-[#D6F2F8] rounded-xl flex items-center justify-center">
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-[15px] font-semibold text-gray-900">{title}</h3>

        <p className="text-sm text-gray-600 mt-1">{description}</p>

        {/* Footer */}
        <p className="text-xs text-gray-400 mt-2">{time}</p>
      </div>
    </div>
  );
}
