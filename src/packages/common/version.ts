import { getSystemInfoSync } from "./utils";


// compare two version numbers
function comporeVersion(v1: any, v2: any) {
  v1 = v1.split(".");
  v2 = v2.split(".");
  const len = Math.max(v1.length, v2.length);

  while (v1.length < len) {
    v1.push("0");
  }

  while (v2.length < len) {
    v2.push("0");
  }

  for (let i = 0; i < len; i++) {
    let num1 = parseInt(v1[i], 10);
    let num2 = parseInt(v2[i], 10);

    if (num1 > num2) {
      return 1;
    }

    if (num1 < num2) {
      return -1;
    }
  }

  return 0;
}

// determine whether it is a available version
function gte(version: string){
    return comporeVersion(getSystemInfoSync,version) >= 0
}

export function canIUseModel() {
    return gte('2.9.3');
  }
  
  export function canIUseFormFieldButton() {
    return gte('2.10.3');
  }
  
  export function canIUseAnimate() {
    return gte('2.9.0');
  }
  
  export function canIUseGroupSetData() {
    return gte('2.4.0');
  }
  
  export function canIUseNextTick() {
    return wx.canIUse('nextTick');
  }
  
  export function canIUseCanvas2d() {
    return gte('2.9.0');
  }
  
  export function canIUseGetUserProfile() {
    return !!wx.getUserProfile;
  }
  