import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout as LayoutIcon, Save, Edit3, X, Plus, Trash2, Settings2 } from 'lucide-react';

interface Table {
  id: number;
  name: string;
  capacity: number;
  x: number;
  y: number;
  zona: 'Salón' | 'Terraza';
}

const initialTables: Table[] = [
  { id: 1, name: 'M1', capacity: 2, x: 50, y: 50, zona: 'Salón' },
  { id: 2, name: 'M2', capacity: 4, x: 150, y: 180, zona: 'Salón' },
  { id: 3, name: 'M3', capacity: 6, x: 500, y: 100, zona: 'Terraza' },
  { id: 4, name: 'M4', capacity: 2, x: 600, y: 300, zona: 'Terraza' },
  { id: 5, name: 'M5', capacity: 4, x: 300, y: 250, zona: 'Salón' },
];

const PlanoSala: React.FC = () => {
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingTable, setEditingTable] = useState<Table | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (id: number, info: any) => {
    const container = containerRef.current;
    if (!container) return;

    const { width } = container.getBoundingClientRect();
    const midPoint = width / 2;

    setTables((prevTables) =>
      prevTables.map((t) => {
        if (t.id === id) {
          const newX = Math.max(0, t.x + info.offset.x);
          const newY = Math.max(0, t.y + info.offset.y);
          const newZone = newX < midPoint ? 'Salón' : 'Terraza';

          return {
            ...t,
            x: newX,
            y: newY,
            zona: newZone,
          };
        }
        return t;
      })
    );
  };

  const addTable = () => {
    const container = containerRef.current;
    if (!container) return;
    const { width, height } = container.getBoundingClientRect();
    
    const newTable: Table = {
      id: Date.now(),
      name: `M${tables.length + 1}`,
      capacity: 2,
      x: width / 2 - 40,
      y: height / 2 - 40,
      zona: 'Salón',
    };
    setTables([...tables, newTable]);
  };

  const updateTable = (id: number, updates: Partial<Table>) => {
    setTables(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTable = (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta mesa?')) {
      setTables(prev => prev.filter(t => t.id !== id));
      setEditingTable(null);
    }
  };

  const handleSave = () => {
    console.log('Distribución guardada:', tables);
    alert('Distribución guardada en consola.');
    setIsEditMode(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Cabecera / Controles */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <LayoutIcon className="mr-2 h-6 w-6 text-indigo-600" />
            Plano de Sala
          </h2>
          <p className="text-gray-500 text-sm">Organiza las mesas arrastrándolas por el suelo.</p>
        </div>
        
        <div className="flex space-x-3">
          {isEditMode && (
            <button
              onClick={addTable}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nueva Mesa
            </button>
          )}

          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              isEditMode 
                ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {isEditMode ? (
              <>
                <X className="h-4 w-4 mr-2" />
                Salir de Edición
              </>
            ) : (
              <>
                <Edit3 className="h-4 w-4 mr-2" />
                Modo Edición
              </>
            )}
          </button>
          
          <button
            onClick={handleSave}
            disabled={!isEditMode}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              isEditMode
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Save className="h-4 w-4 mr-2" />
            Guardar Distribución
          </button>
        </div>
      </div>

      {/* Contenedor del "Suelo" */}
      <div 
        ref={containerRef}
        className={`flex-1 relative rounded-xl overflow-hidden shadow-inner flex ${
          isEditMode ? 'border-2 border-dashed border-indigo-400' : 'border border-gray-200'
        }`}
      >
        {/* Zonas de Fondo */}
        <div className="absolute inset-0 flex">
          {/* Salón */}
          <div className="flex-1 bg-blue-50/40 relative flex items-center justify-center border-r-2 border-dashed border-gray-200">
            <span className="text-6xl font-black text-blue-200/30 uppercase select-none pointer-events-none">Salón</span>
          </div>
          {/* Terraza */}
          <div className="flex-1 bg-orange-50/40 relative flex items-center justify-center">
            <span className="text-6xl font-black text-orange-200/30 uppercase select-none pointer-events-none">Terraza</span>
          </div>
        </div>

        {/* Mesas */}
        <div className="absolute inset-0 pointer-events-none">
           {/* Este div permite que el dragConstraints funcione correctamente sobre todo el área */}
        </div>

        {tables.map((table) => (
          <motion.div
            key={table.id}
            drag={isEditMode}
            dragConstraints={containerRef}
            dragMomentum={false}
            onDragEnd={(e, info) => handleDragEnd(table.id, info)}
            onDoubleClick={() => isEditMode && setEditingTable(table)}
            animate={{ x: table.x, y: table.y }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`absolute flex flex-col items-center justify-center rounded-lg shadow-md select-none pointer-events-auto ${
              isEditMode ? 'cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-indigo-400' : 'cursor-default'
            } ${
              table.zona === 'Salón' 
                ? 'bg-blue-100 border-2 border-blue-400 text-blue-900' 
                : 'bg-orange-100 border-2 border-orange-400 text-orange-900'
            } ${
              table.capacity > 6 ? 'w-28 h-28' :
              table.capacity > 4 ? 'w-24 h-24' : 
              table.capacity > 2 ? 'w-20 h-20' : 
              'w-16 h-16'
            }`}
          >
            {isEditMode && (
              <button 
                onClick={(e) => { e.stopPropagation(); setEditingTable(table); }}
                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm border border-gray-200 hover:bg-gray-50 text-indigo-600"
              >
                <Settings2 className="w-3 h-3" />
              </button>
            )}
            <span className="font-bold text-gray-800">{table.name}</span>
            <span className="text-xs text-gray-600">{table.capacity} pax</span>
          </motion.div>
        ))}
        
        {/* Leyenda en modo edición */}
        {isEditMode && (
          <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur px-3 py-2 rounded-lg text-sm text-gray-600 border border-gray-200 shadow-sm">
            💡 Arrastra para mover • Doble clic para editar.
          </div>
        )}

        {/* Modal de Edición */}
        <AnimatePresence>
          {editingTable && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4"
              onClick={() => setEditingTable(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-3xl p-6 w-full max-w-xs shadow-2xl space-y-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">Editar Mesa</h3>
                  <button onClick={() => setEditingTable(null)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-600">Nombre</label>
                    <input
                      type="text"
                      value={editingTable.name}
                      onChange={(e) => {
                        const newName = e.target.value;
                        setEditingTable({ ...editingTable, name: newName });
                        updateTable(editingTable.id, { name: newName });
                      }}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-600">Capacidad (Pax)</label>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={editingTable.capacity}
                      onChange={(e) => {
                        const newCap = parseInt(e.target.value);
                        setEditingTable({ ...editingTable, capacity: newCap });
                        updateTable(editingTable.id, { capacity: newCap });
                      }}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex flex-col space-y-2">
                  <button
                    onClick={() => deleteTable(editingTable.id)}
                    className="flex items-center justify-center w-full py-2.5 text-red-600 font-semibold rounded-xl border border-red-100 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-5 h-5 mr-2" />
                    Eliminar Mesa
                  </button>
                  <button
                    onClick={() => setEditingTable(null)}
                    className="w-full py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PlanoSala;
