"use client";

import React from "react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
} from "@/registry/new-york/ui/avatar";

// Basic Avatar Preview
export function BasicAvatar() {
  return (
    <div className="flex items-center gap-4 not-prose">
      <Avatar>
        <AvatarImage src="https://via.placeholder.com/40" alt="User Avatar" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <div className="text-sm">
        <p className="font-medium">Basic Avatar</p>
        <p className="text-muted-foreground">With image and fallback</p>
      </div>
    </div>
  );
}

// Avatar with Fallback Preview
export function AvatarWithFallback() {
  return (
    <div className="flex items-center gap-4 not-prose">
      <Avatar>
        <AvatarImage src="" alt="User Avatar" />
        <AvatarFallback>CD</AvatarFallback>
      </Avatar>
      <div className="text-sm">
        <p className="font-medium">Fallback Only</p>
        <p className="text-muted-foreground">When image fails to load</p>
      </div>
    </div>
  );
}

// Avatar Group Preview
export function AvatarGroupPreview() {
  return (
    <div className="flex items-center gap-4 not-prose">
      <AvatarGroup>
        <Avatar>
          <AvatarImage src="https://via.placeholder.com/40" alt="User 1" />
          <AvatarFallback>U1</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://via.placeholder.com/40" alt="User 2" />
          <AvatarFallback>U2</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://via.placeholder.com/40" alt="User 3" />
          <AvatarFallback>U3</AvatarFallback>
        </Avatar>
      </AvatarGroup>
      <div className="text-sm">
        <p className="font-medium">Avatar Group</p>
        <p className="text-muted-foreground">Standard overlapping avatars</p>
      </div>
    </div>
  );
}

// Avatar Group with Hover Scale
export function AvatarGroupHoverScale() {
  return (
    <div className="flex items-center gap-4 not-prose">
      <AvatarGroup hoverScale>
        <Avatar>
          <AvatarImage src="https://via.placeholder.com/40" alt="User A" />
          <AvatarFallback>UA</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://via.placeholder.com/40" alt="User B" />
          <AvatarFallback>UB</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://via.placeholder.com/40" alt="User C" />
          <AvatarFallback>UC</AvatarFallback>
        </Avatar>
      </AvatarGroup>
      <div className="text-sm">
        <p className="font-medium">Hover Scale Effect</p>
        <p className="text-muted-foreground">
          Hover over avatars to see effect
        </p>
      </div>
    </div>
  );
}

// Avatar Sizes
export function AvatarSizes() {
  return (
    <div className="flex items-end gap-4 not-prose">
      <div className="flex flex-col items-center gap-2">
        <Avatar className="h-6 w-6">
          <AvatarImage
            src="https://via.placeholder.com/40"
            alt="Small Avatar"
          />
          <AvatarFallback className="text-xs">XS</AvatarFallback>
        </Avatar>
        <span className="text-xs text-muted-foreground">XS</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src="https://via.placeholder.com/40"
            alt="Small Avatar"
          />
          <AvatarFallback className="text-xs">SM</AvatarFallback>
        </Avatar>
        <span className="text-xs text-muted-foreground">SM</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Avatar>
          <AvatarImage
            src="https://via.placeholder.com/40"
            alt="Default Avatar"
          />
          <AvatarFallback>MD</AvatarFallback>
        </Avatar>
        <span className="text-xs text-muted-foreground">MD</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src="https://via.placeholder.com/40"
            alt="Large Avatar"
          />
          <AvatarFallback>LG</AvatarFallback>
        </Avatar>
        <span className="text-xs text-muted-foreground">LG</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src="https://via.placeholder.com/40"
            alt="X-Large Avatar"
          />
          <AvatarFallback>XL</AvatarFallback>
        </Avatar>
        <span className="text-xs text-muted-foreground">XL</span>
      </div>
    </div>
  );
}

// Avatar Shapes
export function AvatarShapes() {
  return (
    <div className="flex items-end gap-4 not-prose">
      <div className="flex flex-col items-center gap-2">
        <Avatar>
          <AvatarImage
            src="https://via.placeholder.com/40"
            alt="Circle Avatar"
          />
          <AvatarFallback>CI</AvatarFallback>
        </Avatar>
        <span className="text-xs text-muted-foreground">Circle</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Avatar className="rounded-md overflow-hidden">
          <AvatarImage
            src="https://via.placeholder.com/40"
            alt="Rounded Avatar"
          />
          <AvatarFallback className="rounded-md">RO</AvatarFallback>
        </Avatar>
        <span className="text-xs text-muted-foreground">Rounded</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Avatar className="rounded-none overflow-hidden">
          <AvatarImage
            src="https://via.placeholder.com/40"
            alt="Square Avatar"
          />
          <AvatarFallback className="rounded-none">SQ</AvatarFallback>
        </Avatar>
        <span className="text-xs text-muted-foreground">Square</span>
      </div>
    </div>
  );
}

// Styled Avatars
export function StyledAvatars() {
  return (
    <div className="flex items-center gap-4 not-prose">
      <Avatar className="border-2 border-primary">
        <AvatarImage
          src="https://via.placeholder.com/40"
          alt="Bordered Avatar"
        />
        <AvatarFallback>BD</AvatarFallback>
      </Avatar>

      <Avatar className="ring-2 ring-primary ring-offset-2">
        <AvatarImage src="https://via.placeholder.com/40" alt="Ring Avatar" />
        <AvatarFallback>RG</AvatarFallback>
      </Avatar>

      <Avatar className="shadow-lg">
        <AvatarImage src="https://via.placeholder.com/40" alt="Shadow Avatar" />
        <AvatarFallback>SH</AvatarFallback>
      </Avatar>

      <Avatar className="bg-gradient-to-r from-pink-500 to-purple-500">
        <AvatarImage src="" alt="Gradient Avatar" />
        <AvatarFallback className="text-white">GR</AvatarFallback>
      </Avatar>
    </div>
  );
}

// Use Case: User Profile
export function UserProfileAvatar() {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg border not-prose">
      <Avatar className="h-14 w-14 ring-2 ring-primary/10 ring-offset-2">
        <AvatarImage src="https://via.placeholder.com/40" alt="John Doe" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium">John Doe</p>
        <p className="text-sm text-muted-foreground">Senior Developer</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span>Online</span>
        </div>
      </div>
    </div>
  );
}

// Use Case: Team Members
export function TeamMembersAvatars() {
  return (
    <div className="p-4 rounded-lg border not-prose">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium">Project Team</h3>
        <span className="text-xs text-muted-foreground">5 members</span>
      </div>
      <AvatarGroup>
        <Avatar>
          <AvatarImage src="https://via.placeholder.com/40" alt="Member 1" />
          <AvatarFallback>M1</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://via.placeholder.com/40" alt="Member 2" />
          <AvatarFallback>M2</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://via.placeholder.com/40" alt="Member 3" />
          <AvatarFallback>M3</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://via.placeholder.com/40" alt="Member 4" />
          <AvatarFallback>M4</AvatarFallback>
        </Avatar>
        <Avatar className="bg-primary/10">
          <AvatarFallback className="text-xs bg-transparent">+2</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    </div>
  );
}

// Combined preview for basic examples
export function AvatarPreview() {
  return (
    <div className="space-y-6 max-w-lg mx-auto not-prose">
      <BasicAvatar />
      <AvatarWithFallback />
      <AvatarGroupPreview />
      <AvatarGroupHoverScale />
    </div>
  );
}

export default AvatarPreview;
