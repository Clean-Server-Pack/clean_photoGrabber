local settings = require 'settings.scene'


local currentScene = false 

local toggleWeather = function(bool)
  if bool == true then 
    StartResource('clean_weather')
    return 
  else 
    StopResource('clean_weather')
  end 
	SetRainLevel(0.0);
	SetWeatherTypePersist('EXTRASUNNY');
	SetWeatherTypeNow('EXTRASUNNY');
	SetWeatherTypeNowPersist('EXTRASUNNY');
	NetworkOverrideClockTime(18, 0, 0);
	NetworkOverrideClockMillisecondsPerGameMinute(1000000);
end

---@param _type 'ped' | 'other'
local inScene = false
createScene = function(_type)
  if inScene then exitScene() end
  inScene = true
  if _type == 'ped' then
    SetEntityCoordsNoOffset(cache.ped, settings.position.x, settings.position.y, settings.position.z)
    SetEntityRotation(cache.ped, 0, 0, settings.position.w, 0, false)
  elseif _type == 'vehicle' then
    SetEntityCoordsNoOffset(cache.ped, settings.hiddenSpot.x, settings.hiddenSpot.y, settings.hiddenSpot.z)
  end 
  FreezeEntityPosition(cache.ped, true)

  SetPlayerControl(PlayerId(), false)
  DisableIdleCamera(true)

  CreateThread(function()
    while inScene do
      ClearPedTasksImmediately(cache.ped)
      Wait(1)
    end
  end)
end

exitScene = function()
  inScene = false
  FreezeEntityPosition(cache.ped, false)
  SetPlayerControl(PlayerId(), true)
  DisableIdleCamera(false)
end

AddEventHandler('onResourceStop', function(resource)
  if resource == GetCurrentResourceName() then
    exitScene()
  end
end)