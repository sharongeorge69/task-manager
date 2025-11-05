export function getInitials(fullName) {
    const names = (fullName || "").trim().split(/\s+/).filter(Boolean);
  
    const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());
  
    const initialsStr = initials.join("");
  
    return initialsStr;
  }