import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  MapPin, 
  Upload,
  X,
  Check,
  AlertCircle,
  Mic,
  MicOff,
  Zap,
  Brain,
  Sparkles
} from 'lucide-react';
import { CATEGORY_CONFIG, IssueCategory } from '../../types';

export default function ReportForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '' as IssueCategory | '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    location: '',
    images: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [showAiHelper, setShowAiHelper] = useState(false);
  const [formProgress, setFormProgress] = useState(0);

  // Calculate form completion progress
  useEffect(() => {
    const fields = [formData.title, formData.description, formData.category, formData.location];
    const completed = fields.filter(field => field.trim() !== '').length;
    setFormProgress((completed / fields.length) * 100);
  }, [formData]);

  // AI suggestions based on title
  useEffect(() => {
    if (formData.title.length > 10) {
      const suggestions = [
        "Consider adding the exact location details",
        "Include time when you first noticed this issue",
        "Mention if this affects vehicle/pedestrian safety",
        "Add details about weather conditions if relevant"
      ];
      setAiSuggestions(suggestions);
      setShowAiHelper(true);
    } else {
      setShowAiHelper(false);
    }
  }, [formData.title]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        title: '',
        description: '',
        category: '',
        priority: 'medium',
        location: '',
        images: []
      });
    }, 3000);
  };

  const startVoiceRecording = () => {
    setIsRecording(true);
    // Simulate voice recording
    setTimeout(() => {
      setIsRecording(false);
      setFormData(prev => ({
        ...prev,
        description: prev.description + " [Voice note: Large pothole causing vehicle damage, water accumulation during rain]"
      }));
    }, 3000);
  };

  const suggestCategory = () => {
    const keywords = formData.title.toLowerCase() + ' ' + formData.description.toLowerCase();
    if (keywords.includes('pothole') || keywords.includes('road')) {
      setFormData(prev => ({ ...prev, category: 'roads' }));
    } else if (keywords.includes('water') || keywords.includes('leak')) {
      setFormData(prev => ({ ...prev, category: 'water' }));
    } else if (keywords.includes('light') || keywords.includes('lamp')) {
      setFormData(prev => ({ ...prev, category: 'streetlights' }));
    } else if (keywords.includes('garbage') || keywords.includes('trash')) {
      setFormData(prev => ({ ...prev, category: 'garbage' }));
    }
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // In a real app, you'd upload these to a server
    const imageUrls = files.map(() => 'https://images.pexels.com/photos/7135057/pexels-photo-7135057.jpeg?auto=compress&cs=tinysrgb&w=400');
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls].slice(0, 3) // Max 3 images
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode this
          setFormData(prev => ({
            ...prev,
            location: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)} (Current Location)`
          }));
        },
        (error) => {
          alert('Unable to get your location. Please enter manually.');
        }
      );
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center animate-fadeIn">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Submitted Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for reporting this issue. We'll review it and update you on the progress.
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 animate-pulse">
            <p className="text-blue-800 font-medium">Your report ID: #CR{Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
            <p className="text-blue-600 text-sm mt-1">You can track the progress in your dashboard</p>
          </div>
          <div className="mt-6 flex justify-center space-x-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Track Progress
            </button>
            <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              Report Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Report a Civic Issue</h1>
        <p className="text-gray-600">Help improve your community by reporting problems that need attention</p>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Form Progress</span>
            <span>{Math.round(formProgress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${formProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* AI Helper */}
      {showAiHelper && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-4 mb-6 animate-slideIn">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Brain className="h-4 w-4 text-purple-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-purple-900 mb-2 flex items-center">
                <Sparkles className="h-4 w-4 mr-1" />
                AI Suggestions
              </h4>
              <div className="space-y-2">
                {aiSuggestions.map((suggestion, index) => (
                  <div key={index} className="text-sm text-purple-700 flex items-center">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
                    {suggestion}
                  </div>
                ))}
              </div>
              <button 
                onClick={suggestCategory}
                className="mt-3 text-sm bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Auto-suggest Category
              </button>
            </div>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
          {/* Title */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Issue Title *
            </label>
            <input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Large pothole on Main Street"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
            />
          </div>

          {/* Category and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                required
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as IssueCategory }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
              >
                <option value="">Select a category</option>
                {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2 flex items-center justify-between">
              Detailed Description *
              <button
                type="button"
                onClick={startVoiceRecording}
                disabled={isRecording}
                className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm transition-all duration-300 ${
                  isRecording 
                    ? 'bg-red-100 text-red-700 animate-pulse' 
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                <span>{isRecording ? 'Recording...' : 'Voice Note'}</span>
              </button>
            </label>
            <textarea
              id="description"
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Provide detailed information about the issue, including when it started, severity, and any safety concerns..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-300 hover:border-gray-400"
            />
          </div>

          {/* Location */}
          <div className="mb-6">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                id="location"
                required
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Enter the address or describe the location"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
              />
              <button
                type="button"
                onClick={getCurrentLocation}
                className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center space-x-2 transform hover:scale-105"
              >
                <MapPin className="h-5 w-5" />
                <span className="hidden sm:inline">Use Current</span>
              </button>
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photos (Optional - Max 3)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-300">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4 hover:text-blue-500 transition-colors" />
                <p className="text-gray-600 mb-2">Click to upload photos or drag and drop</p>
                <p className="text-sm text-gray-500">PNG, JPG up to 10MB each</p>
              </label>
            </div>

            {/* Image Preview */}
            {formData.images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={image} 
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300 transform hover:scale-110"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Privacy Notice */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
              <div>
                <h4 className="text-sm font-medium text-blue-900 mb-1">Privacy Notice</h4>
                <p className="text-sm text-blue-700">
                  Your report will be visible to community members and local authorities. 
                  Personal information will be kept confidential.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 ${
              formProgress === 100 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg' 
                : 'bg-gray-300 text-gray-500'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Submitting...</span>
              </>
            ) : formProgress < 100 ? (
              <>
                <Zap className="h-5 w-5" />
                <span>Complete form to submit</span>
              </>
            ) : (
              <>
                <Upload className="h-5 w-5" />
                <span>Submit Report</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}