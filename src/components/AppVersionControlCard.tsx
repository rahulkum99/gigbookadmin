import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Smartphone, MonitorSmartphone, Globe } from 'lucide-react';
import { toast } from 'sonner';
import { AppVersionConfig } from '@/data/settingsData';

interface AppVersionControlCardProps {
  initialConfig: AppVersionConfig;
}

export function AppVersionControlCard({ initialConfig }: AppVersionControlCardProps) {
  const [iosVersion, setIosVersion] = useState(initialConfig.ios);
  const [androidVersion, setAndroidVersion] = useState(initialConfig.android);
  const [webVersion, setWebVersion] = useState(initialConfig.web);

  const handleVersionUpdate = (platform: string, version: string) => {
    toast.success(`${platform} minimum version updated to ${version}`);
  };

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">App Version Governance</CardTitle>
        <CardDescription className="text-gray-600">
          Set minimum supported app versions across all platforms
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            Users below the minimum version will be prompted to update their app. No forced logout behavior is applied.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-gray-500" />
              <Label htmlFor="ios-version" className="text-sm font-medium text-gray-900">
                Minimum iOS Version
              </Label>
            </div>
            <Input
              id="ios-version"
              type="text"
              value={iosVersion}
              onChange={(e) => setIosVersion(e.target.value)}
              onBlur={() => handleVersionUpdate('iOS', iosVersion)}
              placeholder="e.g., 2.4.0"
              className="border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
            <p className="text-xs text-gray-500">
              Applies to iPhone and iPad users
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MonitorSmartphone className="w-4 h-4 text-gray-500" />
              <Label htmlFor="android-version" className="text-sm font-medium text-gray-900">
                Minimum Android Version
              </Label>
            </div>
            <Input
              id="android-version"
              type="text"
              value={androidVersion}
              onChange={(e) => setAndroidVersion(e.target.value)}
              onBlur={() => handleVersionUpdate('Android', androidVersion)}
              placeholder="e.g., 2.4.1"
              className="border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
            <p className="text-xs text-gray-500">
              Applies to Android mobile and tablet users
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-gray-500" />
              <Label htmlFor="web-version" className="text-sm font-medium text-gray-900">
                Minimum Web Version
              </Label>
            </div>
            <Input
              id="web-version"
              type="text"
              value={webVersion}
              onChange={(e) => setWebVersion(e.target.value)}
              onBlur={() => handleVersionUpdate('Web', webVersion)}
              placeholder="e.g., 1.8.2"
              className="border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
            <p className="text-xs text-gray-500">
              Applies to browser-based users
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
