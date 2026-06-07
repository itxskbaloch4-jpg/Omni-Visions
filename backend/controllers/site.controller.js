import SiteSettings from '../models/SiteSettings.model.js'

export const getSettings = async (req, res) => {
  try {
    let settings = await SiteSettings.findOne()
    if (!settings) settings = await SiteSettings.create({})
    res.json({ success: true, data: settings })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const updateSettings = async (req, res) => {
  try {
    let settings = await SiteSettings.findOne()
    if (!settings) settings = new SiteSettings()
    Object.assign(settings, req.body)
    await settings.save()
    res.json({ success: true, data: settings, message: 'Settings updated successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const resetSettings = async (req, res) => {
  try {
    await SiteSettings.deleteMany()
    const settings = await SiteSettings.create({})
    res.json({ success: true, data: settings, message: 'Settings reset to defaults' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
