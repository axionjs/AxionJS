"use client";

import React from "react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
} from "@/registry/new-york/ui/avatar";

export default function AvatarPreview() {
  return (
    <div className="space-y-6 max-w-md mx-auto">
      {/* Example 1: Basic Avatar */}
      <div>
        <h3 className="text-lg font-medium">Basic Avatar</h3>
        <Avatar>
          <AvatarImage src="https://via.placeholder.com/40" alt="User Avatar" />
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      </div>

      {/* Example 2: Avatar with Fallback */}
      <div>
        <h3 className="text-lg font-medium">Avatar with Fallback</h3>
        <Avatar>
          <AvatarImage src="" alt="User Avatar" />
          <AvatarFallback>CD</AvatarFallback>
        </Avatar>
      </div>

      {/* Example 3: Avatar Group */}
      <div>
        <h3 className="text-lg font-medium">Avatar Group</h3>
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
      </div>

      {/* Example 4: Avatar Group with Hover Scale */}
      <div>
        <h3 className="text-lg font-medium">Avatar Group with Hover Scale</h3>
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
      </div>
    </div>
  );
}
