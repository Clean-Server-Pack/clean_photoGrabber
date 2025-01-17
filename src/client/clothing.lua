local cameras = require 'settings.cameras'
local scene = require 'settings.scene'

local resetPed = function()
  
	SetPedDefaultComponentVariation(cache.ped);

	Wait(150)
	SetPedComponentVariation(cache.ped, 0, 0, 1, 0); --Head
	SetPedComponentVariation(cache.ped, 1, 0, 0, 0); --Mask
	SetPedComponentVariation(cache.ped, 2, -1, 0, 0); --Hair
	SetPedComponentVariation(cache.ped, 7, 0, 0, 0); --Accessories
	SetPedComponentVariation(cache.ped, 5, 0, 0, 0); --Bags
	SetPedComponentVariation(cache.ped, 6, -1, 0, 0); --Shoes
	SetPedComponentVariation(cache.ped, 9, 0, 0, 0); --Armor
	SetPedComponentVariation(cache.ped, 3, -1, 0, 0); --Torso
	SetPedComponentVariation(cache.ped, 8, -1, 0, 0); --Undershirt
	SetPedComponentVariation(cache.ped, 4, -1, 0, 0); --Legs
	SetPedComponentVariation(cache.ped, 11, -1, 0, 0); --Top
	SetPedHairColor(cache.ped, 45, 15);

	ClearAllPedProps();
end

local getCameraInfo = function(_type, index)
  local options = cameras[_type]
  if not options then return nil end
  if options[index] then return name, options[index] end
  for key, value in pairs(options) do
    if toUpperCase(value.name) == toUpperCase(index) then
      return key, value
    end
  end
  return nil
end

local currentCam = nil
local createPedCam = function(data)


  local x,y,z = table.unpack(GetEntityCoords(cache.ped))
  local fwdX, fwdY, fwdZ = table.unpack(GetEntityForwardVector(cache.ped))

  local camPos = vector3(
    x + fwdX * 1.2,
    y + fwdY * 1.2,
    z + fwdZ + data.zPos
  )

  local greenScreenPos = scene.position 
  local dist = #(camPos.xyz - greenScreenPos.xyz)
  print('Distance to green screen: ', dist)
  print('Creating camera at: ', camPos.x, camPos.y, camPos.z)

  currentCam = CreateCamWithParams('DEFAULT_SCRIPTED_CAMERA', camPos.x, camPos.y, camPos.z, 0, 0, 0, data.fov, true, 0);
  PointCamAtCoord(currentCam, x, y, z + data.zPos)
  SetCamActive(currentCam, true)
  SetCamFov(currentCam, data.fov)
  RenderScriptCams(true, false, 0, true, false, 0)

  SetEntityRotation(cache.ped, data.rotation.x, data.rotation.y, data.rotation.z, 2, false)
end

RegisterCommand('clothingCapture', function(src, args)
  local _type, gender = args[1], args[2]
  local models = {}
  if not gender then 
    table.insert(models, 'mp_m_freemode_01')
    table.insert(models, 'mp_f_freemode_01')
  else
    table.insert(models, gender == 'female' and 'mp_f_freemode_01' or 'mp_m_freemode_01')
  end
  createScene('ped')

  for _, model in pairs(models) do 
    local model_loaded = lib.request.model(model)
    if not model_loaded then return print('Failed to load model: ' .. model) end

    SetPlayerModel(PlayerId(), GetHashKey(model))
    Wait(100)
    SetModelAsNoLongerNeeded(GetHashKey(model))
    cache:set('ped', PlayerPedId())

    for componentId, camInfo in pairs(cameras.clothing) do 

      createPedCam(camInfo)
      resetPed()
      componentId = tonumber(componentId)
      local maxDrawable = GetNumberOfPedDrawableVariations(cache.ped, componentId) - 1
      for drawable = 0, maxDrawable do
        SetPedComponentVariation(cache.ped, componentId, drawable, 0, 0)
        Wait(100)
      end
    end 
  end 

end)