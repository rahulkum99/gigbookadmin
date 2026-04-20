import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { AlertTriangle, Bell } from 'lucide-react';

export function EmergencyBroadcastCard() {
  const [message, setMessage] = useState('');
  const [ctaText, setCtaText] = useState('');

  const handleSendBroadcast = () => {
    if (!message.trim()) {
      toast.error('Please enter a broadcast message');
      return;
    }
    toast.success('Emergency broadcast sent to all users');
    setMessage('');
    setCtaText('');
  };

  const isValid = message.trim().length > 0;

  return (
    <Card className="border-amber-200 bg-amber-50/50">
      <CardHeader className="border-b border-amber-200 bg-amber-50">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-100">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900">
              Emergency Broadcast
            </CardTitle>
            <CardDescription className="text-amber-700">
              Send critical platform-wide announcements to all users
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="broadcast-message" className="text-sm font-medium text-gray-900">
            Announcement Message
          </Label>
          <Textarea
            id="broadcast-message"
            placeholder="Enter your emergency broadcast message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[100px] resize-none border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            maxLength={500}
          />
          <p className="text-sm text-gray-500">
            {message.length} / 500 characters
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cta-text" className="text-sm font-medium text-gray-900">
            Call-to-Action Text (Optional)
          </Label>
          <Input
            id="cta-text"
            placeholder="e.g., Learn More, View Details, etc."
            value={ctaText}
            onChange={(e) => setCtaText(e.target.value)}
            className="border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            maxLength={30}
          />
        </div>

        {message && (
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-900">
              Preview
            </Label>
            <div className="p-4 bg-white rounded-lg border-2 border-gray-200 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex-shrink-0">
                  <Bell className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-2">
                  <p className="text-sm font-medium text-gray-900">System Announcement</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {message}
                  </p>
                  {ctaText && (
                    <button className="mt-2 px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-md hover:opacity-90 transition-opacity">
                      {ctaText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-amber-200">
          <p className="text-sm text-amber-700">
            This will send a notification to all users immediately
          </p>
          <Button
            onClick={handleSendBroadcast}
            disabled={!isValid}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            Send Broadcast
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
