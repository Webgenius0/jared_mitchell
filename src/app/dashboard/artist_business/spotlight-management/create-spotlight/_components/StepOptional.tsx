"use client";

import React from "react";
import {
  Users,
  Briefcase,
  Link2,
  Award,
  Clock,
} from "lucide-react";
import { TextField, TextAreaField, InfoBox, StepCard } from "./FormFields";
import type { FormData } from "./types";

interface StepOptionalProps {
  form: FormData;
  update: <K extends keyof FormData>(key: K) => (value: FormData[K]) => void;
}

export function StepOptional({ form, update }: StepOptionalProps) {
  return (
    <StepCard
      index={6}
      title="Optional Information"
      description="Help us learn more about you. While optional, this information can enhance your spotlight profile and help us serve you better."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextField
          label="Talent Management Contact"
          optional
          placeholder="Manager name and contact"
          value={form.managerContact}
          onChange={update("managerContact")}
          icon={Users}
        />
        <TextField
          label="Agent's Contact"
          optional
          placeholder="Agent name and email"
          value={form.agentContact}
          onChange={update("agentContact")}
          icon={Briefcase}
        />
      </div>
      <TextField
        label="Link to Press Kit"
        optional
        placeholder="https://yourportfolio.com/press"
        value={form.pressKitLink}
        onChange={update("pressKitLink")}
        icon={Link2}
      />
      <TextAreaField
        label="Previous Interviews"
        optional
        helper="Links to any previous interviews, podcasts, or features"
        placeholder="Link 1, Link 2, Link 3..."
        value={form.previousInterviews}
        onChange={update("previousInterviews")}
        icon={Link2}
        rows={3}
      />
      <TextAreaField
        label="Awards or Recognition"
        optional
        helper="List any awards, recognitions, or notable achievements"
        placeholder="e.g., Best New Artist 2024, Featured in X Magazine..."
        value={form.awards}
        onChange={update("awards")}
        icon={Award}
        rows={3}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextField
          label="Preferred Pronouns"
          optional
          placeholder="e.g., she/her, he/him, they/them"
          value={form.preferredPronouns}
          onChange={update("preferredPronouns")}
        />
        <TextField
          label="Preferred Contact Method"
          optional
          placeholder="e.g., email, phone, Instagram DM"
          value={form.preferredContactMethod}
          onChange={update("preferredContactMethod")}
        />
      </div>
      <TextAreaField
        label="Interview Availability"
        optional
        helper="Let us know your general availability for interviews (e.g. weekday evenings, weekend mornings)"
        placeholder="e.g., Available weekdays after 6pm, or weekend mornings"
        value={form.interviewAvailability}
        onChange={update("interviewAvailability")}
        icon={Clock}
        rows={3}
      />

      <InfoBox variant="blue" title="Pro Tip:">
        Providing additional information can lead to advanced
        spotlight packages, better networking opportunities, and
        more promotion.
      </InfoBox>
    </StepCard>
  );
}
