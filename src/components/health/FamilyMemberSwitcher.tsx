import React, { useState, useRef } from 'react';
import { 
  Users, UserPlus, Edit3, Trash2, Check, X, Shield, 
  Sparkles, Heart, Activity, Target, Camera, Upload, User, AlertCircle
} from 'lucide-react';
import { 
  FamilyMemberProfile 
} from '../../types';
import { 
  getFamilyMembers, 
  getActiveMemberId, 
  setActiveMemberId, 
  addFamilyMember, 
  updateFamilyMember, 
  deleteFamilyMember,
  processDeviceImageFile
} from '../../services/healthService';

interface FamilyMemberSwitcherProps {
  onMemberChanged: (member: FamilyMemberProfile) => void;
}

export const FamilyMemberSwitcher: React.FC<FamilyMemberSwitcherProps> = ({ onMemberChanged }) => {
  const [members, setMembers] = useState<FamilyMemberProfile[]>(() => getFamilyMembers());
  const [activeId, setActiveId] = useState<string>(() => getActiveMemberId());
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMemberProfile | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<FamilyMemberProfile | null>(null);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);
  const [isProcessingImage, setIsProcessingImage] = useState(false);

  // Hidden file inputs
  const quickFileInputRef = useRef<HTMLInputElement>(null);
  const modalFileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formRelation, setFormRelation] = useState<FamilyMemberProfile['relation']>('other');
  const [formRelationFa, setFormRelationFa] = useState('عضو خانواده');
  const [formAvatar, setFormAvatar] = useState(''); // Blank by default, user imports custom image from phone
  const [formGender, setFormGender] = useState<'male' | 'female'>('male');
  const [formAge, setFormAge] = useState(30);
  const [formHeight, setFormHeight] = useState(175);
  const [formWeight, setFormWeight] = useState(75);
  const [formTargetWeight, setFormTargetWeight] = useState(70);
  const [formActivity, setFormActivity] = useState<FamilyMemberProfile['activityLevel']>('moderate');
  const [formGoal, setFormGoal] = useState<FamilyMemberProfile['goal']>('weight_loss');
  const [formWeeks, setFormWeeks] = useState(8);

  const activeMember = members.find(m => m.id === activeId) || members[0];

  const notifyUser = (msg: string) => {
    setUploadNotice(msg);
    setTimeout(() => setUploadNotice(null), 3000);
  };

  const handleSelectMember = (id: string) => {
    setActiveId(id);
    setActiveMemberId(id);
    const m = members.find(item => item.id === id);
    if (m) onMemberChanged(m);
  };

  const handleOpenAdd = () => {
    setFormName('');
    setFormRelation('other');
    setFormRelationFa('عضو خانواده');
    setFormAvatar(''); // No preset stock photo
    setFormGender('male');
    setFormAge(30);
    setFormHeight(175);
    setFormWeight(75);
    setFormTargetWeight(70);
    setFormActivity('moderate');
    setFormGoal('weight_loss');
    setFormWeeks(8);
    setShowAddModal(true);
  };

  const handleOpenEdit = (m: FamilyMemberProfile) => {
    setEditingMember(m);
    setFormName(m.name);
    setFormRelation(m.relation);
    setFormRelationFa(m.relationFa);
    setFormAvatar(m.avatarUrl || '');
    setFormGender(m.gender);
    setFormAge(m.age);
    setFormHeight(m.heightCm);
    setFormWeight(m.weightKg);
    setFormTargetWeight(m.targetWeightKg);
    setFormActivity(m.activityLevel);
    setFormGoal(m.goal);
    setFormWeeks(m.targetWeeks);
  };

  const handleRelationChange = (rel: FamilyMemberProfile['relation']) => {
    setFormRelation(rel);
    const mapFa: Record<FamilyMemberProfile['relation'], string> = {
      self: 'خودم',
      spouse: 'همسر',
      child: 'فرزند',
      mother: 'مادر',
      father: 'پدر',
      sibling: 'خواهر / برادر',
      friend: 'دوست',
      other: 'سایر'
    };
    setFormRelationFa(mapFa[rel]);
  };

  // Direct quick photo upload from phone for currently active member
  const handleQuickPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeMember) return;
    try {
      setIsProcessingImage(true);
      const dataUrl = await processDeviceImageFile(file);
      const updated = updateFamilyMember(activeMember.id, { avatarUrl: dataUrl });
      const allMembers = getFamilyMembers();
      setMembers(allMembers);
      onMemberChanged(updated);
      notifyUser(`عکس پروفایل «${activeMember.name}» با موفقیت از گوشی بارگذاری شد.`);
    } catch (err: any) {
      alert(err.message || 'بارگذاری عکس از دستگاه انجام نشد.');
    } finally {
      setIsProcessingImage(false);
      if (quickFileInputRef.current) quickFileInputRef.current.value = '';
    }
  };

  // Modal photo upload from phone
  const handleModalPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsProcessingImage(true);
      const dataUrl = await processDeviceImageFile(file);
      setFormAvatar(dataUrl);
      notifyUser('عکس با موفقیت از گالری گوشی بارگذاری شد.');
    } catch (err: any) {
      alert(err.message || 'خطا در بارگذاری عکس از گوشی.');
    } finally {
      setIsProcessingImage(false);
      if (modalFileInputRef.current) modalFileInputRef.current.value = '';
    }
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const newMember = addFamilyMember({
      name: formName.trim(),
      relation: formRelation,
      relationFa: formRelationFa,
      avatarUrl: formAvatar,
      gender: formGender,
      age: formAge,
      heightCm: formHeight,
      weightKg: formWeight,
      targetWeightKg: formTargetWeight,
      activityLevel: formActivity,
      goal: formGoal,
      targetWeeks: formWeeks
    });

    const updated = getFamilyMembers();
    setMembers(updated);
    setActiveId(newMember.id);
    onMemberChanged(newMember);
    setShowAddModal(false);
    notifyUser(`حساب «${newMember.name}» با موفقیت ایجاد شد.`);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember || !formName.trim()) return;

    const updatedMember = updateFamilyMember(editingMember.id, {
      name: formName.trim(),
      relation: formRelation,
      relationFa: formRelationFa,
      avatarUrl: formAvatar,
      gender: formGender,
      age: formAge,
      heightCm: formHeight,
      weightKg: formWeight,
      targetWeightKg: formTargetWeight,
      activityLevel: formActivity,
      goal: formGoal,
      targetWeeks: formWeeks
    });

    const updated = getFamilyMembers();
    setMembers(updated);
    if (activeId === updatedMember.id) {
      onMemberChanged(updatedMember);
    }
    setEditingMember(null);
    notifyUser(`مشخصات «${updatedMember.name}» به‌روزرسانی شد.`);
  };

  const confirmDeleteMember = () => {
    if (!memberToDelete || members.length <= 1) return;
    const deletedName = memberToDelete.name;
    deleteFamilyMember(memberToDelete.id);
    const updated = getFamilyMembers();
    setMembers(updated);
    if (activeId === memberToDelete.id) {
      const newActive = updated[0];
      setActiveId(newActive.id);
      onMemberChanged(newActive);
    }
    setMemberToDelete(null);
    setEditingMember(null);
    notifyUser(`حساب کاربری «${deletedName}» با موفقیت حذف شد.`);
  };

  // Helper for initial letter
  const getInitial = (name: string) => {
    return name?.trim()?.charAt(0) || '👤';
  };

  return (
    <div className="space-y-3">
      {/* Hidden Quick File Input for instant phone upload */}
      <input
        ref={quickFileInputRef}
        type="file"
        accept="image/*"
        onChange={handleQuickPhotoUpload}
        className="hidden"
      />

      {/* Horizontal Family Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-200">
            <Users className="w-4 h-4 text-amber-400" />
            <span>حساب‌های سلامت اعضای خانواده:</span>
          </div>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 bg-amber-400/10 border border-amber-400/30 px-2.5 py-1 rounded-xl transition active:scale-95"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>افزودن عضو جدید</span>
          </button>
        </div>

        {/* Member Avatars Scroll Row */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {members.map(m => {
            const isSelected = m.id === activeId;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleSelectMember(m.id)}
                className={`flex items-center gap-2 p-1.5 pr-2.5 rounded-2xl shrink-0 border transition active:scale-95 text-right ${
                  isSelected
                    ? 'bg-amber-400/15 border-amber-400 text-slate-100 shadow-md shadow-amber-500/10'
                    : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="relative">
                  {m.avatarUrl ? (
                    <img
                      src={m.avatarUrl}
                      alt={m.name}
                      className={`w-9 h-9 rounded-full object-cover border-2 ${
                        isSelected ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-slate-700'
                      }`}
                    />
                  ) : (
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-xs border-2 shadow-sm ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 border-amber-400 ring-2 ring-amber-400/30'
                          : m.gender === 'female'
                          ? 'bg-rose-950/60 text-rose-300 border-rose-500/40'
                          : 'bg-slate-800 text-slate-200 border-slate-700'
                      }`}
                    >
                      {getInitial(m.name)}
                    </div>
                  )}

                  {isSelected && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                      <Check className="w-2 h-2 text-white stroke-[3]" />
                    </div>
                  )}
                </div>

                <div className="text-[11px] leading-tight">
                  <span className={`font-bold block ${isSelected ? 'text-amber-400' : 'text-slate-200'}`}>
                    {m.name}
                  </span>
                  <div className="flex items-center gap-1 text-[9px] text-slate-400 mt-0.5">
                    <span>{m.relationFa}</span>
                    <span>•</span>
                    <span className="font-semibold">{m.weightKg}kg</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Member Quick Summary Badge with Direct Photo Upload Trigger */}
        {activeMember && (
          <div className="flex items-center justify-between bg-slate-950/80 px-3 py-2 rounded-xl border border-slate-800/80 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">کاربر فعال:</span>
              <span className="font-bold text-amber-400">{activeMember.name}</span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                قد: {activeMember.heightCm}cm | وزن: {activeMember.weightKg}kg | هدف: {activeMember.targetWeightKg}kg
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Quick Photo Upload from Device */}
              <button
                type="button"
                onClick={() => quickFileInputRef.current?.click()}
                disabled={isProcessingImage}
                className="flex items-center gap-1 text-[10px] font-bold text-amber-300 hover:text-amber-200 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 px-2 py-1 rounded-lg transition"
                title="بارگذاری یا تغییر عکس این کاربر مستقیماً از حافظه گوشی"
              >
                <Camera className="w-3 h-3 text-amber-400" />
                <span>{activeMember.avatarUrl ? 'تغییر عکس' : 'افزودن عکس'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleOpenEdit(activeMember)}
                className="text-[10px] text-slate-300 hover:text-amber-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center gap-1 transition px-2 py-1 rounded-lg"
                title="ویرایش قد، وزن و اهداف"
              >
                <Edit3 className="w-3 h-3 text-amber-400" />
                <span>ویرایش</span>
              </button>

              {members.length > 1 && (
                <button
                  type="button"
                  onClick={() => setMemberToDelete(activeMember)}
                  className="text-[10px] text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 flex items-center gap-1 transition px-2 py-1 rounded-lg"
                  title="حذف حساب این عضو خانواده"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>حذف</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Feedback Alert */}
        {uploadNotice && (
          <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] flex items-center gap-2 animate-fadeIn">
            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{uploadNotice}</span>
          </div>
        )}
      </div>

      {/* Add / Edit Member Modal */}
      {(showAddModal || editingMember) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 max-w-sm w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-slate-100">
                  {showAddModal ? 'افزودن حساب عضو جدید خانواده' : `ویرایش مشخصات ${editingMember?.name}`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingMember(null);
                }}
                className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={showAddModal ? handleSaveAdd : handleSaveEdit} className="space-y-3.5 text-xs">
              {/* Photo Upload Section (From Device Storage) */}
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-3.5 space-y-2.5 text-center">
                <label className="text-[11px] font-bold text-slate-300 block">
                  عکس پروفایل (ایمپورت از حافظه یا دوربین گوشی):
                </label>

                {/* Hidden File Input */}
                <input
                  ref={modalFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleModalPhotoUpload}
                  className="hidden"
                />

                <div className="flex flex-col items-center gap-2.5">
                  {/* Current Photo Preview or Initials */}
                  <div className="relative">
                    {formAvatar ? (
                      <div className="relative group">
                        <img
                          src={formAvatar}
                          alt="عکس انتخابی"
                          className="w-16 h-16 rounded-full object-cover border-2 border-amber-400 shadow-md ring-4 ring-amber-400/20"
                        />
                        <button
                          type="button"
                          onClick={() => setFormAvatar('')}
                          className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg hover:bg-rose-500 transition"
                          title="حذف عکس"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-400">
                        <User className="w-7 h-7 text-slate-500 mb-0.5" />
                        <span className="text-[9px] text-slate-500 font-bold">بدون عکس</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={isProcessingImage}
                      onClick={() => modalFileInputRef.current?.click()}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 text-amber-300 font-bold text-xs transition active:scale-95 disabled:opacity-50"
                    >
                      <Camera className="w-3.5 h-3.5 text-amber-400" />
                      <span>{formAvatar ? 'انتخاب عکس دیگر از گوشی' : 'انتخاب عکس از گالری گوشی'}</span>
                    </button>

                    {formAvatar && (
                      <button
                        type="button"
                        onClick={() => setFormAvatar('')}
                        className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 transition"
                        title="حذف عکس و استفاده از نشان نام"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <span className="text-[10px] text-slate-400 leading-tight">
                    فرمت‌های JPG، PNG و تصاویر دوربین با فشرده‌سازی خودکار و بهینه‌سازی حافظه
                  </span>
                </div>
              </div>

              {/* Name & Relation */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">نام یا لقب:</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    placeholder="مثلاً: سارا، مامان، علی..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-slate-100 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">نسبت خانوادگی:</label>
                  <select
                    value={formRelation}
                    onChange={e => handleRelationChange(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2 py-1.5 text-slate-100 text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option value="self">خودم</option>
                    <option value="spouse">همسر</option>
                    <option value="child">فرزند</option>
                    <option value="mother">مادر</option>
                    <option value="father">پدر</option>
                    <option value="sibling">خواهر / برادر</option>
                    <option value="friend">دوست</option>
                    <option value="other">سایر</option>
                  </select>
                </div>
              </div>

              {/* Gender & Age */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">جنسیت:</label>
                  <div className="grid grid-cols-2 gap-1">
                    <button
                      type="button"
                      onClick={() => setFormGender('male')}
                      className={`py-1.5 rounded-lg font-bold text-center transition ${
                        formGender === 'male' ? 'bg-amber-400 text-slate-950' : 'bg-slate-950 text-slate-400'
                      }`}
                    >
                      آقا
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormGender('female')}
                      className={`py-1.5 rounded-lg font-bold text-center transition ${
                        formGender === 'female' ? 'bg-rose-500 text-white' : 'bg-slate-950 text-slate-400'
                      }`}
                    >
                      خانم
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">سن (سال):</label>
                  <input
                    type="number"
                    min={10}
                    max={100}
                    value={formAge}
                    onChange={e => setFormAge(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-slate-100 text-xs text-center"
                  />
                </div>
              </div>

              {/* Height & Weight */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">قد (سانتی‌متر cm):</label>
                  <input
                    type="number"
                    min={100}
                    max={230}
                    value={formHeight}
                    onChange={e => setFormHeight(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-slate-100 text-xs text-center font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">وزن فعلی (kg):</label>
                  <input
                    type="number"
                    step="0.5"
                    min={30}
                    max={250}
                    value={formWeight}
                    onChange={e => setFormWeight(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-slate-100 text-xs text-center font-bold"
                  />
                </div>
              </div>

              {/* Target Weight & Duration */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">وزن هدف (kg):</label>
                  <input
                    type="number"
                    step="0.5"
                    min={30}
                    max={250}
                    value={formTargetWeight}
                    onChange={e => setFormTargetWeight(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-emerald-400 text-xs text-center font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">هدف‌گذاری زمانی (هفته):</label>
                  <select
                    value={formWeeks}
                    onChange={e => setFormWeeks(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2 py-1.5 text-slate-100 text-xs text-center"
                  >
                    <option value={4}>۴ هفته (۱ ماه)</option>
                    <option value={6}>۶ هفته (۱.۵ ماه)</option>
                    <option value={8}>۸ هفته (۲ ماه)</option>
                    <option value={12}>۱۲ هفته (۳ ماه)</option>
                    <option value={16}>۱۶ هفته (۴ ماه)</option>
                  </select>
                </div>
              </div>

              {/* Activity Level */}
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">میزان فعالیت روزانه:</label>
                <select
                  value={formActivity}
                  onChange={e => setFormActivity(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2 py-1.5 text-slate-100 text-xs"
                >
                  <option value="sedentary">کم‌تحرک (کارمندی و بدون ورزش)</option>
                  <option value="light">فعالیت سبک (۱ تا ۲ روز پیاده‌روی)</option>
                  <option value="moderate">فعالیت متوسط (۳ تا ۴ روز ورزش منظم)</option>
                  <option value="active">پرتحرک (۵ تا ۶ روز تمرین سنگین)</option>
                  <option value="very_active">ورزشکار حرفه‌ای (تمرین سخت روزانه)</option>
                </select>
              </div>

              {/* Goal */}
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">هدف رژیم غذایی:</label>
                <select
                  value={formGoal}
                  onChange={e => setFormGoal(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2 py-1.5 text-slate-100 text-xs"
                >
                  <option value="weight_loss">کاهش وزن و لاغری (کسری کالری سالم)</option>
                  <option value="maintenance">تثبیت وزن و حفظ تناسب اندام</option>
                  <option value="muscle_gain">افزایش وزن و حجم عضلانی (مازاد کالری)</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-800">
                {editingMember && members.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      setMemberToDelete(editingMember);
                      setEditingMember(null);
                    }}
                    className="p-2 text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl flex items-center gap-1 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>حذف حساب</span>
                  </button>
                )}

                <div className="flex items-center gap-2 mr-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingMember(null);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 shadow-md shadow-amber-500/20"
                  >
                    {showAddModal ? 'ثبت و ایجاد حساب' : 'ذخیره تغییرات'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* In-App Deletion Confirmation Modal */}
      {memberToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">
                حذف حساب کاربری «{memberToDelete.name}»
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                آیا از حذف این حساب کاربری اطمینان دارید؟ تمامی سوابق وزن‌کشی، اهداف، نمودارهای تغییرات و برنامه رژیم اختصاصی این عضو برای همیشه پاک خواهند شد.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setMemberToDelete(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
              >
                انصراف
              </button>
              <button
                type="button"
                onClick={confirmDeleteMember}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition"
              >
                بله، حذف کن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
