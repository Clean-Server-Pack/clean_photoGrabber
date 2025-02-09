---@param data table
---@param data.quality? number
---@param data.type? 'jpeg' | 'png' | 'webp'
---@return string 

local takeScreenshot = function(data)
  lib.print.info('Taking screenshot...')
  if screenshotPromise then return print('ALREADY TAKING SCREENSHOT') end
  screenshotPromise = promise.new()
  SendNuiMessage(json.encode({
    action = 'TAKE_SCREENSHOT',
    data = data or {
      quality = 100,
      type = 'png'
    }
  }))
  local promise = Citizen.Await(screenshotPromise)
  return true
end

exports('takeScreenshot', takeScreenshot)
lib.callback.register('clean_screenshot:takeScreenshot', function()
  print('Taking screenshot...')
  local data = takeScreenshot()
  return data
end)

RegisterNuiCallback('SET_SCREENSHOT', function(data, cb)
  print('Screenshot taken: ', data)
  if screenshotPromise then
    screenshotPromise:resolve(data)
    screenshotPromise = nil
  end
end)

