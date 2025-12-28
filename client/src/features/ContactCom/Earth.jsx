// src/features/ContactCom/ArtisticIndiaMap.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Navigation, Target, ZoomIn, ZoomOut, 
  Globe, Building2, Users, Clock, Phone, Mail,
  ExternalLink, Maximize2, Minimize2, Layers,
  Award, Shield, Zap, Cpu, Sparkles, Radio,
  Satellite, Waves, Wind, Cloud, Droplets,
  CircleDashed, Circle, Dot, Hexagon
} from 'lucide-react';

const ArtisticIndiaMap = () => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeNode, setActiveNode] = useState(null);
  const [viewMode, setViewMode] = useState('network'); // network, geometric, abstract

  // Network nodes for different cities
  const networkNodes = [
    {
      id: 'surat',
      type: 'hub',
      name: 'SURAT',
      tagline: 'Diamond Tech Hub',
      position: { x: 35, y: 50 },
      color: '#f59e0b',
      gradient: 'from-amber-500 to-orange-600',
      connections: ['mumbai', 'delhi', 'bangalore', 'chennai'],
      stats: {
        team: '50+ Devs',
        focus: 'Core Platform',
        since: '2018'
      },
      icon: <Hexagon className="w-6 h-6" />
    },
    {
      id: 'mumbai',
      type: 'node',
      name: 'MUMBAI',
      tagline: 'Financial Operations',
      position: { x: 30, y: 40 },
      color: '#3b82f6',
      gradient: 'from-blue-500 to-cyan-600',
      connections: ['surat', 'delhi'],
      stats: {
        team: '25+ Ops',
        focus: 'Client Support',
        since: '2019'
      },
      icon: <Circle className="w-6 h-6" />
    },
    {
      id: 'delhi',
      type: 'node',
      name: 'DELHI',
      tagline: 'Business Development',
      position: { x: 45, y: 35 },
      color: '#8b5cf6',
      gradient: 'from-purple-500 to-pink-600',
      connections: ['surat', 'mumbai'],
      stats: {
        team: '15+ Sales',
        focus: 'Growth & BD',
        since: '2020'
      },
      icon: <CircleDashed className="w-6 h-6" />
    },
    {
      id: 'bangalore',
      type: 'node',
      name: 'BANGALORE',
      tagline: 'AI Research Center',
      position: { x: 40, y: 65 },
      color: '#10b981',
      gradient: 'from-emerald-500 to-teal-600',
      connections: ['surat', 'chennai'],
      stats: {
        team: '35+ Engineers',
        focus: 'AI/ML Research',
        since: '2021'
      },
      icon: <Satellite className="w-6 h-6" />
    },
    {
      id: 'chennai',
      type: 'node',
      name: 'CHENNAI',
      tagline: 'QA & Development',
      position: { x: 50, y: 70 },
      color: '#ef4444',
      gradient: 'from-rose-500 to-red-600',
      connections: ['surat', 'bangalore'],
      stats: {
        team: '20+ QA',
        focus: 'Testing & Dev',
        since: '2022'
      },
      icon: <Radio className="w-6 h-6" />
    }
  ];

  // Abstract shapes representing India
  const indiaShapes = [
    {
      id: 'mainland',
      type: 'main',
      points: '30,40 35,45 40,50 45,55 50,60 55,65 50,70 45,75 40,70 35,65 30,60',
      color: '#f59e0b',
      opacity: 0.3
    },
    {
      id: 'north',
      type: 'region',
      points: '40,30 45,35 50,40 45,45 40,40',
      color: '#3b82f6',
      opacity: 0.2
    },
    {
      id: 'south',
      type: 'region',
      points: '45,70 50,75 55,80 50,85 45,80',
      color: '#10b981',
      opacity: 0.2
    }
  ];

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2.5));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleResetView = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setActiveNode(null);
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setPosition(prev => ({
      x: prev.x - e.movementX / zoom,
      y: prev.y - e.movementY / zoom
    }));
  };

  const handleMouseMove = (e) => {
    if (isDragging && e.buttons === 1) {
      setPosition(prev => ({
        x: prev.x - e.movementX / zoom,
        y: prev.y - e.movementY / zoom
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleNodeClick = (node) => {
    setActiveNode(node.id);
    // Center on the node
    setPosition({
      x: -node.position.x * zoom + window.innerWidth / 2,
      y: -node.position.y * zoom + window.innerHeight / 2
    });
    setZoom(1.5);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setActiveNode(null);
  };

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'w-full h-96'} rounded-2xl overflow-hidden border border-gray-800/50 bg-gradient-to-br from-gray-900/30 via-black/30 to-gray-900/30 backdrop-blur-xl`}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, rgba(245, 158, 11, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)`,
          }} />
        </div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(90deg, #4b5563 1px, transparent 1px),
                            linear-gradient(180deg, #4b5563 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Floating Orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, Math.sin(i) * 100, 0],
              y: [0, Math.cos(i) * 100, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
            className={`absolute w-32 h-32 rounded-full blur-3xl ${
              i % 3 === 0 ? 'bg-amber-500/10' : 
              i % 3 === 1 ? 'bg-purple-500/10' : 
              'bg-emerald-500/10'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      
      {/* Map Container */}
      <div 
        className="relative w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            scale: zoom,
            x: position.x,
            y: position.y,
          }}
        >
          {/* Abstract India Visualization */}
          <svg
            width="600"
            height="600"
            viewBox="0 0 100 100"
            className="opacity-90"
          >
            {/* Background Circles */}
            <circle cx="50" cy="50" r="40" fill="url(#radialGradient)" opacity="0.1" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="#4b5563" strokeWidth="0.2" strokeDasharray="2,2" />
            
            {/* Abstract India Shapes */}
            {viewMode === 'geometric' && indiaShapes.map((shape) => (
              <polygon
                key={shape.id}
                points={shape.points}
                fill={shape.color}
                fillOpacity={shape.opacity}
                stroke={shape.color}
                strokeWidth="0.3"
                strokeOpacity="0.5"
              />
            ))}
            
            {/* Network View */}
            {viewMode === 'network' && (
              <>
                {/* Connection Lines */}
                {networkNodes.map((node) =>
                  node.connections.map((connId) => {
                    const targetNode = networkNodes.find(n => n.id === connId);
                    if (!targetNode) return null;
                    
                    return (
                      <line
                        key={`${node.id}-${connId}`}
                        x1={node.position.x}
                        y1={node.position.y}
                        x2={targetNode.position.x}
                        y2={targetNode.position.y}
                        stroke={node.color}
                        strokeWidth="0.3"
                        strokeOpacity="0.4"
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          from="0"
                          to="20"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </line>
                    );
                  })
                )}
                
                {/* Network Nodes */}
                {networkNodes.map((node) => (
                  <g key={node.id}>
                    {/* Node Glow */}
                    <circle
                      cx={node.position.x}
                      cy={node.position.y}
                      r="3"
                      fill={node.color}
                      fillOpacity="0.2"
                      className="cursor-pointer"
                      onClick={() => handleNodeClick(node)}
                    />
                    
                    {/* Node Core */}
                    <motion.circle
                      cx={node.position.x}
                      cy={node.position.y}
                      r="1.5"
                      fill={node.color}
                      initial={{ scale: 1 }}
                      animate={{ 
                        scale: node.id === 'surat' ? [1, 1.2, 1] : 1,
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="cursor-pointer"
                      onClick={() => handleNodeClick(node)}
                    />
                    
                    {/* Node Ring */}
                    <circle
                      cx={node.position.x}
                      cy={node.position.y}
                      r="2"
                      fill="none"
                      stroke={node.color}
                      strokeWidth="0.2"
                      strokeOpacity="0.5"
                      className="cursor-pointer"
                      onClick={() => handleNodeClick(node)}
                    />
                  </g>
                ))}
              </>
            )}
            
            {/* Abstract View */}
            {viewMode === 'abstract' && (
              <>
                {/* Wave Patterns */}
                <path
                  d="M30,50 Q40,45 50,50 T70,50"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="0.3"
                  strokeOpacity="0.4"
                >
                  <animate
                    attributeName="d"
                    values="M30,50 Q40,45 50,50 T70,50;M30,52 Q40,47 50,52 T70,52;M30,50 Q40,45 50,50 T70,50"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </path>
                
                {/* Floating Dots */}
                {[...Array(15)].map((_, i) => (
                  <circle
                    key={i}
                    cx={30 + (i % 5) * 10}
                    cy={40 + Math.floor(i / 5) * 10}
                    r="0.5"
                    fill={i % 3 === 0 ? '#f59e0b' : i % 3 === 1 ? '#3b82f6' : '#10b981'}
                    opacity="0.6"
                  >
                    <animate
                      attributeName="cy"
                      values={`${40 + Math.floor(i / 5) * 10};${42 + Math.floor(i / 5) * 10};${40 + Math.floor(i / 5) * 10}`}
                      dur="2s"
                      begin={`${i * 0.1}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                ))}
              </>
            )}
            
            {/* Gradients */}
            <defs>
              <radialGradient id="radialGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
              </radialGradient>
            </defs>
          </svg>
        </motion.div>
        
        {/* Floating Data Points */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, Math.sin(i) * 50, 0],
              y: [0, Math.cos(i) * 50, 0],
              rotate: [0, 360, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 8 + Math.random() * 8,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 3
            }}
            className={`absolute w-1 h-1 rounded-full ${
              i % 4 === 0 ? 'bg-amber-400/30' : 
              i % 4 === 1 ? 'bg-purple-400/30' : 
              i % 4 === 2 ? 'bg-emerald-400/30' : 
              'bg-blue-400/30'
            }`}
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
          />
        ))}
      </div>
      
      {/* Top Controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.button
            onClick={handleResetView}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-black/40 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all"
            title="Reset View"
          >
            <Navigation className="w-4 h-4 text-gray-300" />
          </motion.button>
          
          <div className="flex items-center gap-2">
            <div className="px-3 py-2 rounded-lg bg-black/40 backdrop-blur-sm border border-gray-700/50">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-300" />
                <span className="text-sm text-gray-200">India Network</span>
              </div>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1">
              {['network', 'geometric', 'abstract'].map((mode) => (
                <motion.button
                  key={mode}
                  onClick={() => handleViewModeChange(mode)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    viewMode === mode
                      ? 'bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-500/30 text-amber-300'
                      : 'bg-black/40 backdrop-blur-sm border border-gray-700/50 text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <motion.button
            onClick={handleToggleFullscreen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-black/40 backdrop-blur-sm border border-gray-700/50 hover:border-amber-500/50 transition-all"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 text-gray-300" />
            ) : (
              <Maximize2 className="w-4 h-4 text-gray-300" />
            )}
          </motion.button>
        </div>
      </div>
      
      {/* Bottom Controls */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="px-3 py-2 rounded-lg bg-black/40 backdrop-blur-sm border border-gray-700/50">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-300" />
                <span className="text-sm text-gray-200">
                  {activeNode 
                    ? networkNodes.find(n => n.id === activeNode)?.name
                    : 'Connected Network'
                  }
                </span>
              </div>
            </div>
            
            {/* Stats Display */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs text-gray-400">1 Hub</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-xs text-gray-400">4 Nodes</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-3 h-3 text-emerald-400" />
                <span className="text-xs text-gray-400">145+ Team</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              onClick={handleZoomOut}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-black/40 backdrop-blur-sm border border-gray-700/50 hover:border-amber-500/50 transition-all"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4 text-gray-300" />
            </motion.button>
            
            <div className="px-3 py-2 rounded-lg bg-black/40 backdrop-blur-sm border border-gray-700/50">
              <span className="text-sm text-gray-200">{zoom.toFixed(1)}x</span>
            </div>
            
            <motion.button
              onClick={handleZoomIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-black/40 backdrop-blur-sm border border-gray-700/50 hover:border-amber-500/50 transition-all"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4 text-gray-300" />
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Node Details Panel */}
      <AnimatePresence>
        {activeNode && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-20 right-4 w-72"
          >
            <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-gray-700/50 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-500/30"
                    style={{
                      background: networkNodes.find(n => n.id === activeNode)?.gradient ?
                        `linear-gradient(135deg, var(--tw-gradient-stops))` : '',
                      '--tw-gradient-from': networkNodes.find(n => n.id === activeNode)?.color + '20',
                      '--tw-gradient-to': networkNodes.find(n => n.id === activeNode)?.color + '40',
                      '--tw-gradient-stops': `var(--tw-gradient-from), var(--tw-gradient-to)`
                    }}
                  >
                    {networkNodes.find(n => n.id === activeNode)?.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">
                      {networkNodes.find(n => n.id === activeNode)?.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {networkNodes.find(n => n.id === activeNode)?.tagline}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveNode(null)}
                  className="p-1.5 rounded-lg hover:bg-gray-800/50 transition-colors"
                >
                  <span className="text-gray-400">×</span>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(networkNodes.find(n => n.id === activeNode)?.stats || {}).map(([key, value]) => (
                    <div key={key} className="text-center p-3 rounded-lg bg-gray-900/30 border border-gray-800/50">
                      <div className="text-lg font-bold text-white">{value}</div>
                      <div className="text-xs text-gray-500 capitalize mt-1">{key}</div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Connected To</span>
                    <span className="text-amber-300">
                      {networkNodes.find(n => n.id === activeNode)?.connections.length} Nodes
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {networkNodes.find(n => n.id === activeNode)?.connections.map((connId) => {
                      const node = networkNodes.find(n => n.id === connId);
                      if (!node) return null;
                      return (
                        <span
                          key={connId}
                          className="px-2 py-1 rounded-full text-xs border"
                          style={{
                            backgroundColor: `${node.color}20`,
                            borderColor: `${node.color}40`,
                            color: node.color
                          }}
                        >
                          {node.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-800/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-900/30">
                      <Waves className="w-4 h-4 text-amber-400" />
                    </div>
                    <span className="text-sm text-gray-300">
                      Real-time data flow from connected nodes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Network Overview Panel */}
      <div className="absolute top-20 left-4">
        <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-gray-700/50 p-5 w-64">
          <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Cloud className="w-4 h-4 text-amber-300" />
            India Network Overview
          </h4>
          
          <div className="space-y-4">
            {networkNodes.map((node) => (
              <motion.div
                key={node.id}
                whileHover={{ x: 5 }}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${
                  activeNode === node.id
                    ? 'border-amber-500/50 bg-gradient-to-r from-amber-500/10 to-transparent'
                    : 'border-gray-800/50 hover:border-gray-700/50'
                }`}
                onClick={() => handleNodeClick(node)}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: `${node.color}20`,
                      border: `1px solid ${node.color}40`
                    }}
                  >
                    <div className="text-xs" style={{ color: node.color }}>
                      {node.type === 'hub' ? '★' : '●'}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-semibold text-white">{node.name}</h5>
                      <div className="flex items-center gap-1">
                        <Dot className="w-4 h-4" style={{ color: node.color }} />
                        <span className="text-xs text-gray-400">{node.type}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{node.tagline}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-5 pt-4 border-t border-gray-800/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500/20 to-purple-500/20">
                <Zap className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Live Network Status</p>
                <p className="text-xs text-gray-500">All systems operational</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Visual Mode Indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <div className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs text-gray-300">
                {viewMode === 'network' ? 'Network View' :
                 viewMode === 'geometric' ? 'Geometric View' : 'Abstract View'}
              </span>
            </div>
            <div className="w-px h-4 bg-gray-700/50" />
            <span className="text-xs text-gray-500">Click nodes for details</span>
          </div>
        </div>
      </div>
      
      {/* Fullscreen Close Button */}
      {isFullscreen && (
        <div className="absolute top-4 right-20">
          <motion.button
            onClick={handleToggleFullscreen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg bg-black/40 backdrop-blur-sm border border-gray-700/50 hover:border-rose-500/50 transition-all text-white flex items-center gap-2"
          >
            <Minimize2 className="w-4 h-4" />
            Exit Fullscreen
          </motion.button>
        </div>
      )}
      
      {/* Ambient Effects */}
      <div className="absolute bottom-32 right-4">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-500/10 to-purple-500/10 blur-xl"
        />
      </div>
    </div>
  );
};

export default ArtisticIndiaMap;