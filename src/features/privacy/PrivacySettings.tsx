import { useState, useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { PrivacyManager } from '../../utils/privacy';
import { DataManagement } from '../../utils/dataManagement';
import type { PrivacySettings } from '../../types';

export default function PrivacySettings() {
  const user = useAppSelector((state) => state.auth.user);
  const [settings, setSettings] = useState<PrivacySettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (user?.uid) {
      loadPrivacySettings();
    }
  }, [user?.uid]);

  const loadPrivacySettings = async () => {
    if (!user?.uid) return;

    try {
      const privacySettings = await PrivacyManager.getPrivacySettings(user.uid);
      setSettings(privacySettings);
    } catch (error) {
      console.error('Failed to load privacy settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: keyof PrivacySettings, value: any) => {
    if (!settings) return;

    const updatedSettings = { ...settings, [key]: value };
    setSettings(updatedSettings);

    setSaving(true);
    try {
      await PrivacyManager.updatePrivacySettings(updatedSettings);
    } catch (error) {
      console.error('Failed to update privacy settings:', error);
      // Revert on error
      setSettings(settings);
    } finally {
      setSaving(false);
    }
  };

  const handleExportData = async () => {
    if (!user?.uid) return;

    setExporting(true);
    try {
      const data = await DataManagement.exportUserData(user.uid);
      const filename = `expense-tracker-data-${new Date().toISOString().split('T')[0]}.json`;
      DataManagement.downloadData(data, filename);
    } catch (error) {
      console.error('Failed to export data:', error);
      alert('Failed to export data. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  const handleDeleteData = async () => {
    if (!user?.uid) return;

    const confirmed = window.confirm(
      'Are you sure you want to delete all your data? This action cannot be undone.',
    );

    if (!confirmed) return;

    setDeleting(true);
    try {
      await DataManagement.deleteUserData(user.uid);
      alert('All your data has been deleted successfully.');
      // Optionally redirect to home or logout
    } catch (error) {
      console.error('Failed to delete data:', error);
      alert('Failed to delete data. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center p-8'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400'></div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className='text-center p-8'>
        <p className='text-slate-400'>Unable to load privacy settings.</p>
      </div>
    );
  }

  return (
    <div className='max-w-2xl mx-auto p-6 space-y-8'>
      <div>
        <h1 className='text-2xl font-bold text-slate-100 mb-2'>
          Privacy Settings
        </h1>
        <p className='text-slate-400'>
          Control how your data is stored, shared, and protected.
        </p>
      </div>

      {/* Data Encryption */}
      <div className='bg-slate-800/50 rounded-lg p-6 border border-slate-700'>
        <h2 className='text-lg font-semibold text-slate-100 mb-4'>
          Data Protection
        </h2>

        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-sm font-medium text-slate-200'>
                Data Encryption
              </h3>
              <p className='text-xs text-slate-400'>
                Encrypt sensitive expense data before storing in the cloud
              </p>
            </div>
            <label className='relative inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                checked={settings.dataEncryption}
                onChange={(e) =>
                  updateSetting('dataEncryption', e.target.checked)
                }
                className='sr-only peer'
                disabled={saving}
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Profile Visibility */}
      <div className='bg-slate-800/50 rounded-lg p-6 border border-slate-700'>
        <h2 className='text-lg font-semibold text-slate-100 mb-4'>
          Profile & Sharing
        </h2>

        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-slate-200 mb-2'>
              Profile Visibility
            </label>
            <select
              value={settings.profileVisibility}
              onChange={(e) =>
                updateSetting(
                  'profileVisibility',
                  e.target.value as 'private' | 'public',
                )
              }
              className='w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500'
              disabled={saving}
            >
              <option value='private'>
                Private - Only you can see your profile
              </option>
              <option value='public'>
                Public - Profile visible to others (coming soon)
              </option>
            </select>
          </div>

          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-sm font-medium text-slate-200'>
                Expense Sharing
              </h3>
              <p className='text-xs text-slate-400'>
                Allow sharing expense reports with others
              </p>
            </div>
            <label className='relative inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                checked={settings.expenseSharing}
                onChange={(e) =>
                  updateSetting('expenseSharing', e.target.checked)
                }
                className='sr-only peer'
                disabled={saving}
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Data Retention */}
      <div className='bg-slate-800/50 rounded-lg p-6 border border-slate-700'>
        <h2 className='text-lg font-semibold text-slate-100 mb-4'>
          Data Retention
        </h2>

        <div>
          <label className='block text-sm font-medium text-slate-200 mb-2'>
            Keep my data for
          </label>
          <select
            value={settings.dataRetention}
            onChange={(e) =>
              updateSetting(
                'dataRetention',
                e.target.value as '1year' | '2years' | 'forever',
              )
            }
            className='w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500'
            disabled={saving}
          >
            <option value='1year'>1 year</option>
            <option value='2years'>2 years</option>
            <option value='forever'>Forever</option>
          </select>
          <p className='text-xs text-slate-400 mt-1'>
            After this period, your data will be automatically deleted.
          </p>
        </div>
      </div>

      {/* Analytics */}
      <div className='bg-slate-800/50 rounded-lg p-6 border border-slate-700'>
        <h2 className='text-lg font-semibold text-slate-100 mb-4'>
          Analytics & Improvements
        </h2>

        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-sm font-medium text-slate-200'>
              Usage Analytics
            </h3>
            <p className='text-xs text-slate-400'>
              Help improve the app by sharing anonymous usage data
            </p>
          </div>
          <label className='relative inline-flex items-center cursor-pointer'>
            <input
              type='checkbox'
              checked={settings.analyticsConsent}
              onChange={(e) =>
                updateSetting('analyticsConsent', e.target.checked)
              }
              className='sr-only peer'
              disabled={saving}
            />
            <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
          </label>
        </div>
      </div>

      {/* Data Export/Delete */}
      <div className='bg-slate-800/50 rounded-lg p-6 border border-slate-700'>
        <h2 className='text-lg font-semibold text-slate-100 mb-4'>
          Data Management
        </h2>

        <div className='space-y-3'>
          <button
            onClick={handleExportData}
            disabled={exporting}
            className='w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-slate-200 rounded-md transition duration-200 text-sm font-medium'
          >
            {exporting ? 'Exporting...' : 'Export My Data'}
          </button>
          <button
            onClick={handleDeleteData}
            disabled={deleting}
            className='w-full px-4 py-2 bg-red-900/20 hover:bg-red-900/40 disabled:bg-red-900/50 disabled:cursor-not-allowed text-red-300 border border-red-700 rounded-md transition duration-200 text-sm font-medium'
          >
            {deleting ? 'Deleting...' : 'Delete All My Data'}
          </button>
        </div>
        <p className='text-xs text-slate-400 mt-3'>
          Data export includes all your expenses, budgets, and settings.
          Deletion is permanent and cannot be undone.
        </p>
      </div>

      {saving && (
        <div className='fixed bottom-4 right-4 bg-slate-800 text-slate-200 px-4 py-2 rounded-md shadow-lg'>
          Saving...
        </div>
      )}
    </div>
  );
}
